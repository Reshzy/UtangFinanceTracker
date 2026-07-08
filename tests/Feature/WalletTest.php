<?php

namespace Tests\Feature;

use App\Enums\WalletType;
use App\Models\Wallet;
use App\Models\Workspace;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class WalletTest extends TestCase
{
    use RefreshDatabase;

    public function test_wallet_schema_uses_documented_defaults(): void
    {
        $workspace = Workspace::factory()->create();

        $walletId = DB::table('wallets')->insertGetId([
            'workspace_id' => $workspace->id,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $wallet = Wallet::query()->findOrFail($walletId);

        $this->assertModelExists($wallet);
        $this->assertSame('Cash', $wallet->name);
        $this->assertSame(WalletType::Cash, $wallet->type);
        $this->assertTrue($wallet->is_default);
    }

    public function test_wallet_belongs_to_a_workspace(): void
    {
        $workspace = Workspace::factory()->create();
        $wallet = Wallet::factory()->for($workspace)->create();

        $this->assertTrue($wallet->workspace->is($workspace));
        $this->assertTrue($workspace->wallets()->whereKey($wallet->getKey())->exists());
    }

    public function test_wallet_factory_creates_a_default_cash_wallet(): void
    {
        $wallet = Wallet::factory()->create();

        $this->assertModelExists($wallet);
        $this->assertSame('Cash', $wallet->name);
        $this->assertSame(WalletType::Cash, $wallet->type);
        $this->assertTrue($wallet->is_default);
    }
}
