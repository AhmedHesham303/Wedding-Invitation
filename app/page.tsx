// app/page.tsx
"use client";

import { useState } from "react";
import InvitationDetails from "@/components/InvitationDetails";
import AudioPlayer from "@/components/AudioPlayer";
import EnvelopeHero from "@/components/EnvelopeHero";

export default function Home() {
  const [opened, setOpened] = useState(false);

  return (
    <main className="bg-black min-h-screen relative">
      {!opened ? (
        <EnvelopeHero onOpen={() => setOpened(true)} />
      ) : (
        <>
          {/* Audio player only mounts and starts playing after envelope opens */}
          <AudioPlayer autoPlayTrigger={true} />
          <InvitationDetails />
        </>
      )}
    </main>
  );
}
