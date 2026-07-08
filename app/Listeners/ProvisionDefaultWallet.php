<?php

namespace App\Listeners;

use App\Enums\WalletType;
use App\Events\WorkspaceCreated;

class ProvisionDefaultWallet
{
    /**
     * Handle the event.
     *
     * Runs synchronously inside the DB transaction opened by CreatePersonalWorkspace,
     * so no explicit transaction is needed here.
     */
    public function handle(WorkspaceCreated $event): void
    {
        $event->workspace->wallets()->create([
            'name' => 'Cash',
            'type' => WalletType::Cash,
            'is_default' => true,
        ]);
    }
}
