<?php

namespace App\Listeners;

use App\Events\WorkspaceCreated;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\DB;

class CreatePersonalWorkspace
{
    /**
     * Handle the event.
     */
    public function handle(Registered $event): void
    {
        if (! $event->user instanceof User) {
            return;
        }

        $user = $event->user;

        DB::transaction(function () use ($user): void {
            $workspace = $user->workspaces()->create([
                'name' => 'Personal',
                'currency_code' => 'PHP',
            ]);

            event(new WorkspaceCreated($workspace));
        });
    }
}
