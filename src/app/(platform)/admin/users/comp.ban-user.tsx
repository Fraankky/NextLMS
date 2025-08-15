"use client";

import { Button } from "@/components/ui/button";
import banUserAction from "./action.ban";
import { useActionState } from "react";

export const BanUser = ({ userId }: { userId: string }) => {
  const [_, action, pending] = useActionState(banUserAction, null);

  return (
    <form action={action}>
      <input name="userId" value={userId} type="hidden" />
      <Button variant="default" size="sm" className="w-fit" disabled={pending}>
        Ban
      </Button>
    </form>
  );
};
