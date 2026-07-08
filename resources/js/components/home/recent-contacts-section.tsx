import { SectionHeader } from '@/components/home/section-header';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import type { PlaceholderContact } from '@/data/home-placeholder';
import { useInitials } from '@/hooks/use-initials';
import { formatMoney } from '@/lib/money';

type RecentContactsSectionProps = {
    contacts: PlaceholderContact[];
};

export function RecentContactsSection({
    contacts,
}: RecentContactsSectionProps) {
    const getInitials = useInitials();

    return (
        <section aria-labelledby="recent-contacts-heading" className="space-y-4">
            <SectionHeader
                title="Recent contacts"
                description="People you've interacted with recently"
                action={
                    <Button variant="ghost" size="sm" className="shrink-0">
                        View all
                    </Button>
                }
            />

            <ul className="space-y-3" id="recent-contacts-heading">
                {contacts.map((contact) => (
                    <li key={contact.id}>
                        <Card className="gap-0 py-4 shadow-sm">
                            <CardHeader className="px-4 pb-2">
                                <div className="flex items-center gap-3">
                                    <Avatar className="size-10">
                                        <AvatarFallback className="text-sm">
                                            {getInitials(contact.fullName)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="min-w-0 flex-1">
                                        <CardTitle className="truncate text-base">
                                            {contact.fullName}
                                        </CardTitle>
                                        <CardDescription className="truncate">
                                            {contact.relationship}
                                            {contact.nickname
                                                ? ` · ${contact.nickname}`
                                                : ''}
                                        </CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="px-4 pt-0">
                                <p className="text-sm text-muted-foreground">
                                    Outstanding balance
                                </p>
                                <p className="text-lg font-semibold tabular-nums">
                                    {formatMoney(contact.outstandingBalance)}
                                </p>
                            </CardContent>
                        </Card>
                    </li>
                ))}
            </ul>
        </section>
    );
}
