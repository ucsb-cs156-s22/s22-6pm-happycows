import React from "react";

export default function CommonsPlay({ currentUser }) {
  // Stryker disable next-line OptionalChaining : too many cases to test for too little value
  const firstName = currentUser?.root ? currentUser?.root?.user?.givenName : "";
  return (
    <div data-testid="CommonsPlay">
      <h1>
        Welcome Farmer {firstName}
      </h1>
    </div>
  );
};