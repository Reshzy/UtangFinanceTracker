import { Bell } from 'lucide-react';
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
import type { PlaceholderReminder } from '@/data/home-placeholder';

type UpcomingRemindersSectionProps = {
    reminders: PlaceholderReminder[];
};

export function UpcomingRemindersSection({
    reminders,
}: UpcomingRemindersSectionProps) {
    return (
        <section
            aria-labelledby="upcoming-reminders-heading"
            className="space-y-4"
        >
            <SectionHeader
                title="Upcoming reminders"
                description="Follow-ups and due dates that need attention"
                action={
                    <Button variant="ghost" size="sm" className="shrink-0">
                        View all
                    </Button>
                }
            />

            <ul className="space-y-3" id="upcoming-reminders-heading">
                {reminders.map((reminder) => (
                    <li key={reminder.id}>
                        <Card className="gap-0 py-4 shadow-sm">
                            <CardHeader className="px-4 pb-2">
                                <div className="flex items-start gap-3">
                                    <div
                                        className={`flex size-10 shrink-0 items-center justify-center rounded-full ${
                                            reminder.isOverdue
                                                ? 'bg-destructive/10 text-destructive'
                                                : 'bg-muted text-muted-foreground'
                                        }`}
                                    >
                                        <Bell className="size-4" />
                                    </div>
                                    <div className="min-w-0 flex-1 space-y-1">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <CardTitle className="text-base">
                                                {reminder.title}
                                            </CardTitle>
                                            {reminder.isOverdue && (
                                                <Badge variant="destructive">
                                                    Overdue
                                                </Badge>
                                            )}
                                        </div>
                                        <CardDescription>
                                            {reminder.contactName}
                                        </CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="px-4 pt-0">
                                <p className="text-sm text-muted-foreground">
                                    {reminder.reminderAt}
                                </p>
                            </CardContent>
                        </Card>
                    </li>
                ))}
            </ul>
        </section>
    );
}
