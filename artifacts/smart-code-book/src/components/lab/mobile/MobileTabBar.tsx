import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { MobileTabId } from '@/lib/lab/storage';
import { cn } from '@/lib/utils';

/**
 * MobileTabBar — bottom content-tab navigator. Shows 5 swipable content
 * tabs: Editor, Console, Preview, Output, Errors. Files and Settings
 * are NOT tabs (they open as bottom sheets via the action bar).
 *
 * The bar gives an explicit tap target so users don't have to discover
 * the swipe gesture. The active tab is highlighted.
 */

interface MobileTabBarProps {
  current: MobileTabId;
  onChange: (tab: MobileTabId) => void;
  /** Showing Preview tab is gated on the active language having a preview. */
  showPreview: boolean;
  /** Showing Errors tab is gated on having any errors. */
  errorCount: number;
}

interface TabDef {
  id: MobileTabId;
  label: string;
  /** true if the tab is available right now. */
  show: boolean;
}

export function MobileTabBar({ current, onChange, showPreview, errorCount }: MobileTabBarProps) {
  const tabs: TabDef[] = [
    { id: 'editor',  label: 'محرر',   show: true },
    { id: 'console', label: 'Console', show: true },
    { id: 'preview', label: 'Preview', show: showPreview },
    { id: 'output',  label: 'Output',  show: true },
    { id: 'errors',  label: `Errors${errorCount ? '·' + errorCount : ''}`, show: true },
  ];

  return (
    <div className="mobile-tabbar" role="tablist" dir="ltr">
      {tabs.filter((t) => t.show).map((t) => {
        const active = current === t.id;
        return (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={active}
            data-mobile-tab={t.id}
            onClick={() => onChange(t.id)}
            className={cn('mobile-tab', active && 'mobile-tab-active')}
          >
            <span className="mobile-tab-label">{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}

/**
 * Edge hint buttons floating to either side — small chevron arrows that
 * flash briefly on first mount to teach the swipe gesture.
 */
interface SwipeHintProps {
  canPrev: boolean;
  canNext: boolean;
  onPrev: () => void;
  onNext: () => void;
}

export function MobileSwipeHint({ canPrev, canNext, onPrev, onNext }: SwipeHintProps) {
  return (
    <>
      {canPrev && (
        <button
          type="button"
          aria-label="السابق"
          className="mobile-swipe-hint mobile-swipe-hint-prev"
          onClick={onPrev}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}
      {canNext && (
        <button
          type="button"
          aria-label="التالي"
          className="mobile-swipe-hint mobile-swipe-hint-next"
          onClick={onNext}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}
    </>
  );
}
