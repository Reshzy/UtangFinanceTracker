import { Head } from '@inertiajs/react';
import { HomeGreeting } from '@/components/home/home-greeting';
import { HomeSearch } from '@/components/home/home-search';
import { QuickStatisticsSection } from '@/components/home/quick-statistics-section';
import { RecentContactsSection } from '@/components/home/recent-contacts-section';
import { RecentFinancialEventsSection } from '@/components/home/recent-financial-events-section';
import { UpcomingRemindersSection } from '@/components/home/upcoming-reminders-section';
import {
    placeholderContacts,
    placeholderFinancialEvents,
    placeholderReminders,
    placeholderStatistics,
} from '@/data/home-placeholder';
import { dashboard } from '@/routes';

export default function Home() {
    return (
        <>
            <Head title="Home" />

            <div className="flex flex-1 flex-col gap-8 p-4 pb-8 md:max-w-3xl md:p-6">
                <HomeGreeting />
                <HomeSearch />
                <RecentContactsSection contacts={placeholderContacts} />
                <UpcomingRemindersSection reminders={placeholderReminders} />
                <QuickStatisticsSection statistics={placeholderStatistics} />
                <RecentFinancialEventsSection
                    events={placeholderFinancialEvents}
                />
            </div>
        </>
    );
}

Home.layout = {
    breadcrumbs: [
        {
            title: 'Home',
            href: dashboard(),
        },
    ],
};
