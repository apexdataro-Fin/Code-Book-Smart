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
import RoadmapPage from '@/pages/RoadmapPage';
import SearchPage from '@/pages/SearchPage';
import QuizReviewPage from '@/pages/QuizReviewPage';

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Cover} />
      <Route path="/intro" component={Intro} />
      <Route path="/toc" component={TableOfContents} />
      <Route path="/roadmap" component={RoadmapPage} />
      <Route path="/search" component={SearchPage} />
      <Route path="/quiz/review" component={QuizReviewPage} />
      {/* Stage-level helpers */}
      <Route path="/stage" component={TableOfContents} />
      <Route path="/stage/:stageId" component={TableOfContents} />
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
        {/* Hash-based routing so GitHub Pages deep links resolve without
            depending on a 404.html fallback. Internal wouter <Link href="...">
            auto-prefix with "#" so URLs become "#/intro", "#/toc", etc. */}
        <WouterRouter hook={useHashLocation}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
