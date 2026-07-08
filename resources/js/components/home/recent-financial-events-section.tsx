import {
    Activity,
    ArrowDownLeft,
    ArrowUpRight,
    Bell,
    StickyNote,
} from 'lucide-react';
import { SectionHeader } from '@/components/home/section-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import type {
    FinancialEventType,
    PlaceholderFinancialEvent,
} from '@/data/home-placeholder';
import { formatMoney } from '@/lib/money';

type RecentFinancialEventsSectionProps = {
    events: PlaceholderFinancialEvent[];
};

const eventConfig: Record<
    FinancialEventType,
    {
        label: string;
        icon: typeof ArrowUpRight;
        badgeVariant: 'default' | 'secondary' | 'outline';
        amountClassName?: string;
    }
> = {
    loan: {
        label: 'Loan',
        icon: ArrowUpRight,
        badgeVariant: 'outline',
    },
    repayment: {
        label: 'Repayment',
        icon: ArrowDownLeft,
        badgeVariant: 'secondary',
        amountClassName: 'text-green-600 dark:text-green-400',
    },
    activity: {
        label: 'Activity',
        icon: Activity,
        badgeVariant: 'outline',
    },
    reminder: {
        label: 'Reminder',
        icon: Bell,
        badgeVariant: 'outline',
    },
    note: {
        label: 'Note',
        icon: StickyNote,
        badgeVariant: 'outline',
    },
};

export function RecentFinancialEventsSection({
    events,
}: RecentFinancialEventsSectionProps) {
    return (
        <section
            aria-labelledby="recent-financial-events-heading"
            className="space-y-4"
        >
            <SectionHeader
                title="Recent financial events"
                description="Latest activity across your contacts"
                action={
                    <Button variant="ghost" size="sm" className="shrink-0">
                        View all
                    </Button>
                }
            />

            <Card className="gap-0 py-0 shadow-sm">
                <CardHeader className="sr-only">
                    <CardTitle id="recent-financial-events-heading">
                        Recent financial events
                    </CardTitle>
                    <CardDescription>
                        Latest activity across your contacts
                    </CardDescription>
                </CardHeader>
                <CardContent className="px-0 py-0">
                    <ul>
                        {events.map((event, index) => {
                            const config = eventConfig[event.type];
                            const Icon = config.icon;

                            return (
                                <li key={event.id}>
                                    {index > 0 && <Separator />}
                                    <div className="flex items-start gap-3 px-4 py-4">
                                        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                                            <Icon className="size-4" />
                                        </div>
                                        <div className="min-w-0 flex-1 space-y-1">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <p className="font-medium">
                                                    {event.title}
                                                </p>
                                                <Badge
                                                    variant={config.badgeVariant}
                                                >
                                                    {config.label}
                                                </Badge>
                                            </div>
                                            <p className="text-sm text-muted-foreground">
                                                {event.contactName}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {event.occurredAt}
                                            </p>
                                        </div>
                                        {event.amount !== undefined && (
                                            <p
                                                className={`shrink-0 text-sm font-semibold tabular-nums ${config.amountClassName ?? ''}`}
                                            >
                                                {formatMoney(event.amount)}
                                            </p>
                                        )}
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </CardContent>
            </Card>
        </section>
    );
}
