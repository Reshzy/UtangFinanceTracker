import { SectionHeader } from '@/components/home/section-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { PlaceholderStatistic } from '@/data/home-placeholder';
import { formatMoney } from '@/lib/money';

type QuickStatisticsSectionProps = {
    statistics: PlaceholderStatistic[];
};

function formatStatisticValue(statistic: PlaceholderStatistic): string {
    if (statistic.format === 'count') {
        return statistic.value.toLocaleString('en-PH');
    }

    return formatMoney(statistic.value);
}

export function QuickStatisticsSection({
    statistics,
}: QuickStatisticsSectionProps) {
    return (
        <section aria-labelledby="quick-statistics-heading" className="space-y-4">
            <SectionHeader
                title="Quick statistics"
                description="A snapshot of your lending activity"
            />

            <ul
                className="grid grid-cols-2 gap-3"
                id="quick-statistics-heading"
            >
                {statistics.map((statistic) => (
                    <li key={statistic.label}>
                        <Card className="gap-0 py-4 shadow-sm">
                            <CardHeader className="px-4 pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">
                                    {statistic.label}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="px-4 pt-0">
                                <p className="text-xl font-semibold tracking-tight tabular-nums">
                                    {formatStatisticValue(statistic)}
                                </p>
                            </CardContent>
                        </Card>
                    </li>
                ))}
            </ul>
        </section>
    );
}
