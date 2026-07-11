import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { useHashLocation } from 'wouter/use-hash-location';
import Cover from '@/pages/Cover';
import Intro from '@/pages/Intro';
import TableOfContents from '@/pages/TableOfContents';
import UnitPage from '@/pages/UnitPage';
import AppendixPage from '@/pages/AppendixPage';
import PromptsPage from '@/pages/PromptsPage';
import CapstonePage from '@/pages/CapstonePage';
import NotFound from '@/pages/not-found';

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Cover} />
      <Route path="/intro" component={Intro} />
      <Route path="/toc" component={TableOfContents} />
      <Route path="/stage/:stageId/unit/:unitId" component={UnitPage} />
      <Route path="/appendix" component={AppendixPage} />
      <Route path="/prompts" component={PromptsPage} />
      <Route path="/capstone" component={CapstonePage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {/* Hash-based routing so GitHub Pages deep links resolve
            without depending on a 404.html fallback (which GitHub
            Pages does NOT reliably serve for project-page URLs). ALL
            internal wouter <Link href="..."> props auto-prefix with
            "#" so URLs become "#/intro", "#/toc", etc. The Cover
            (root) renders when the URL fragment is empty. */}
        <WouterRouter hook={useHashLocation}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
