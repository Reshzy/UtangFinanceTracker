import { usePage } from '@inertiajs/react';
import type { Auth } from '@/types';

function getGreeting(): string {
    const hour = new Date().getHours();

    if (hour < 12) {
        return 'Good morning';
    }

    if (hour < 18) {
        return 'Good afternoon';
    }

    return 'Good evening';
}

function getFirstName(fullName: string): string {
    return fullName.trim().split(/\s+/)[0] ?? fullName;
}

export function HomeGreeting() {
    const { auth } = usePage<{ auth: Auth }>().props;
    const firstName = getFirstName(auth.user.name);

    return (
        <header className="space-y-1">
            <p className="text-sm text-muted-foreground">{getGreeting()}</p>
            <h1 className="text-2xl font-semibold tracking-tight">
                {firstName}
            </h1>
        </header>
    );
}
