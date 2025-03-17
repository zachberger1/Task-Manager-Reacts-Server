import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

export default function HoverCardDemo() {
  return (
    <HoverCard>
      <div className="flex items-center gap-3">
        <div className="space-y-0.5">
          <HoverCardTrigger asChild>
            <p>
              <a className="text-sm font-medium hover:underline" href="https://mattiscohenart.com/" target="_blank">
                Mattis Chone Art
              </a>
            </p>
          </HoverCardTrigger>
          <p className="text-muted-foreground text-xs" >https://mattiscohenart.com/</p>
        </div>
      </div>
      {/* <HoverCardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <img
              className="shrink-0 rounded-full"
              src="avatar-40-05.jpg"
              width={40}
              height={40}
              alt="Avatar"
            />
            <div className="space-y-0.5">
              <p className="text-sm font-medium">Keith Kennedy</p>
              <p className="text-muted-foreground text-xs">@k.kennedy</p>
            </div>
          </div>
          <p className="text-muted-foreground text-sm">
            Designer at <strong className="text-foreground font-medium">@Origin UI</strong>.
            Crafting web experiences with Tailwind CSS.
          </p>
          <div className="flex items-center gap-2">
            <div className="flex -space-x-1.5">
              <img
                className="ring-background rounded-full ring-1"
                src="/avatar-20-04.jpg"
                width={20}
                height={20}
                alt="Friend 01"
              />
              <img
                className="ring-background rounded-full ring-1"
                src="/avatar-20-05.jpg"
                width={20}
                height={20}
                alt="Friend 02"
              />
              <img
                className="ring-background rounded-full ring-1"
                src="/avatar-20-06.jpg"
                width={20}
                height={20}
                alt="Friend 03"
              />
            </div>
            <div className="text-muted-foreground text-xs">3 mutual friends</div>
          </div>
        </div>
      </HoverCardContent> */}
    </HoverCard>
  );
}