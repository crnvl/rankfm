"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Spinner } from "./ui/spinner";
import { Separator } from "./ui/separator";

export const Configure = () => {
  const [loading, setLoading] = useState(false);

  const handleButtonClick = () => {
    setLoading(true);
  };

  return (
    <>
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        Search for an album to get started
      </h1>
      <Separator />
      <Input placeholder="Enter album name" />
      <Button
        className="w-full"
        onClick={() => handleButtonClick()}
        disabled={loading}
      >
        {loading ? <Spinner size="small" show={true} /> : <p>Search</p>}
      </Button>
    </>
  );
};
