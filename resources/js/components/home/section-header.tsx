type SectionHeaderProps = {
    title: string;
    description?: string;
    action?: React.ReactNode;
};

export function SectionHeader({
    title,
    description,
    action,
}: SectionHeaderProps) {
    return (
        <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
                <h2 className="text-base font-semibold tracking-tight">
                    {title}
                </h2>
                {description && (
                    <p className="text-sm text-muted-foreground">
                        {description}
                    </p>
                )}
            </div>
            {action}
        </div>
    );
}
