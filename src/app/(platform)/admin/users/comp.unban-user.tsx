"use client";

import { Button } from "@/components/ui/button";

import { useActionState } from "react";
import unbanUserAction from "./action.unban";

export const UnbanUser = ({ userId }: { userId: string }) => {
  const [_, action, pending] = useActionState(unbanUserAction, null);

  return (
    <form action={action}>
      <input name="userId" value={userId} type="hidden" />
      <Button variant="destructive" size="sm" className="w-fit" disabled={pending}>
        Ban
      </Button>
    </form>
  );
};
