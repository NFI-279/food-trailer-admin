import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description: string;
  actions?: React.ReactNode;
  className?: string;
}

export function PageHeader({ title, description, actions, className }: PageHeaderProps) {
  return (
    <div className={cn("grid min-w-0 gap-2 sm:flex sm:items-end sm:justify-between sm:gap-4", className)}>
      <div className="min-w-0">
        <h2 className="text-2xl font-bold leading-tight tracking-tight sm:text-3xl">{title}</h2>
        <p className="mt-1 max-w-prose text-sm leading-5 text-muted-foreground sm:text-base">{description}</p>
      </div>
      {actions ? <div className="flex w-full shrink-0 sm:w-auto">{actions}</div> : null}
    </div>
  );
}
