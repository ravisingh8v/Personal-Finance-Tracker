import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";
import Master from "./core/components/Master";
import { AuthInterceptor } from "./shared/utility/auth/AuthInterceptor";

function App() {
  const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

  if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key");
  }

  return (
    <>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <SignedIn>
          <AuthInterceptor />
          <Master />
        </SignedIn>
        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
      </ClerkProvider>
    </>
  );
}

export default App;
