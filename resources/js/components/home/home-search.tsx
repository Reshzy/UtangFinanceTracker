import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export function HomeSearch() {
    return (
        <div className="relative">
            <Search
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
            />
            <Input
                type="search"
                readOnly
                aria-label="Search contacts, phone numbers, and notes"
                placeholder="Search contacts, phone numbers, notes..."
                className="h-11 pl-9 text-base md:text-sm"
            />
        </div>
    );
}
