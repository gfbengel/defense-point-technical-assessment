import { Link } from "@tanstack/react-router";
import { ArrowLeftIcon } from "lucide-react";

import { Button } from "../components/ui/button";

export function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-1">
      <p className="text-4xl font-bold">404</p>
      <p className="text-lg mb-4">Page not found!</p>
      <Link to="/">
        <Button size="sm" variant="outline" className="cursor-pointer">
          <ArrowLeftIcon className="size-4 mt-px" />
          Go home
        </Button>
      </Link>
    </div>
  )
}
