import { useRef } from 'react';
import { MonacoEditor } from '../MonacoEditor';
import type { LanguageId } from '@/lib/lab/types';
import type { LabSettings } from '@/lib/lab/types';
import { getMonacoLang } from '@/lib/lab/registry';

/**
 * MobileEditor — thin wrapper around MonacoEditor that hooks into
 * editor-level events to drive parent focus mode.
 *
 *   - `onDidFocusEditorText` → signals `isFocused` to parent (drives
 *     focus-mode CSS class).
 *   - `onDidBlurEditorText`  → signals `!isFocused` after a debounce
 *     so a quick tap-target change doesn't flicker the chrome.
 *   - Double-tap on the Monaco host toggles `mobile-editor-maximized`
 *     via parent callback.
 *
 * The host uses touch-action: manipulation so taps land quickly,
 * AND direction="ltr" with unicode-bidi:isolate to prevent the
 * embedded Latin tokens from being re-ordered by the page's RTL.
 */

interface MobileEditorProps {
  value: string;
  language: LanguageId;
  settings: LabSettings;
  readOnly?: boolean;
  onChange: (val: string) => void;
  onFocusChange: (focused: boolean) => void;
  onToggleMaximize?: () => void;
}

export function MobileEditor({
  value, language, settings, readOnly, onChange, onFocusChange, onToggleMaximize,
}: MobileEditorProps) {
  const lastTapAt = useRef<number>(0);
  const lastTapX = useRef<number>(0);
  const lastTapY = useRef<number>(0);

  const onHostClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const now = Date.now();
    const dx = Math.abs(e.clientX - lastTapX.current);
    const dy = Math.abs(e.clientY - lastTapY.current);
    if (
      now - lastTapAt.current < 280 &&
      dx < 24 && dy < 24 &&
      onToggleMaximize
    ) {
      onToggleMaximize();
      lastTapAt.current = 0;
      return;
    }
    lastTapAt.current = now;
    lastTapX.current = e.clientX;
    lastTapY.current = e.clientY;
  };

  return (
    <div
      className="mobile-editor-host"
      dir="ltr"
      lang="en"
      style={{ unicodeBidi: 'isolate', touchAction: 'manipulation' }}
      onClick={onHostClick}
    >
      <MonacoEditor
        value={value}
        language={getMonacoLang(language)}
        readOnly={readOnly}
        theme="auto"
        fontSize={settings.fontSize}
        wordWrap={settings.wordWrap}
        tabSize={settings.tabSize}
        minimap={false}
        onChange={(v) => onChange(v ?? '')}
        onMount={(editor, monaco) => {
          // Hide the line numbers gutter conditionally on settings.
          try {
            editor.updateOptions({ lineNumbers: settings.lineNumbers ? 'on' : 'off', wordWrap: settings.softWrap ? 'bounded' : 'off' });
          } catch { /* noop */ }

          // Drive focus mode in parent.
          const focusDisposable = editor.onDidFocusEditorText(() => {
            onFocusChange(true);
          });
          const blurDisposable = editor.onDidBlurEditorText(() => {
            // Slight debounce so the user can briefly drag / focus a
            // tooltip without hiding the chrome.
            setTimeout(() => onFocusChange(false), 240);
          });

          // Make sure the cursor line is always visible on mobile
          // keyboards — `cursorSurroundingLines` keeps N lines above
          // and below the active cursor visible whenever it lands on
          // the keyboard.
          try {
            editor.updateOptions({
              cursorSurroundingLines: 8,
              cursorSurroundingLinesStyle: 'default',
              scrollBeyondLastLine: false,
              fixedOverflowWidgets: true,
            });
          } catch { /* noop */ }

          // Cleanup: VS Code / Monaco editor disposes when unmounted.
          editor.onDidDispose(() => {
            try { focusDisposable.dispose(); blurDisposable.dispose(); } catch { /* noop */ }
          });

          // Capture monaco for any future commands (skeleton ack).
          void monaco;
        }}
      />
    </div>
  );
}
