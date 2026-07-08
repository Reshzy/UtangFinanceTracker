<?php

namespace Tests\Feature\Workspace;

use App\Enums\WalletType;
use App\Events\WorkspaceCreated;
use App\Listeners\CreatePersonalWorkspace;
use App\Models\User;
use App\Models\Workspace;
use Illuminate\Auth\Events\Registered;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Event;
use Laravel\Fortify\Features;
use Tests\TestCase;

class BootstrappingTest extends TestCase
{
    use RefreshDatabase;

    // -----------------------------------------------------------------------
    // Full registration flow — integration tests (no event faking)
    // -----------------------------------------------------------------------

    public function test_registration_creates_exactly_one_personal_workspace(): void
    {
        $this->skipUnlessFortifyHas(Features::registration());

        $this->post(route('register.store'), $this->registrationPayload());

        $user = User::query()->where('email', 'test@example.com')->firstOrFail();

        $this->assertSame(1, $user->workspaces()->count());
    }

    public function test_personal_workspace_has_correct_defaults(): void
    {
        $this->skipUnlessFortifyHas(Features::registration());

        $this->post(route('register.store'), $this->registrationPayload());

        $user = User::query()->where('email', 'test@example.com')->firstOrFail();
        $workspace = $user->workspaces()->firstOrFail();

        $this->assertSame('Personal', $workspace->name);
        $this->assertSame('PHP', $workspace->currency_code);
        $this->assertSame($user->id, $workspace->user_id);
    }

    public function test_registration_creates_exactly_one_default_cash_wallet(): void
    {
        $this->skipUnlessFortifyHas(Features::registration());

        $this->post(route('register.store'), $this->registrationPayload());

        $user = User::query()->where('email', 'test@example.com')->firstOrFail();
        $workspace = $user->workspaces()->firstOrFail();

        $this->assertSame(1, $workspace->wallets()->count());
    }

    public function test_cash_wallet_has_correct_defaults(): void
    {
        $this->skipUnlessFortifyHas(Features::registration());

        $this->post(route('register.store'), $this->registrationPayload());

        $user = User::query()->where('email', 'test@example.com')->firstOrFail();
        $workspace = $user->workspaces()->firstOrFail();
        $wallet = $workspace->wallets()->firstOrFail();

        $this->assertSame('Cash', $wallet->name);
        $this->assertSame(WalletType::Cash, $wallet->type);
        $this->assertTrue($wallet->is_default);
        $this->assertSame($workspace->id, $wallet->workspace_id);
    }

    // -----------------------------------------------------------------------
    // Event dispatch — fakes only WorkspaceCreated so CreatePersonalWorkspace
    // still runs, but ProvisionDefaultWallet is bypassed.
    // -----------------------------------------------------------------------

    public function test_workspace_created_event_is_dispatched_on_registration(): void
    {
        $this->skipUnlessFortifyHas(Features::registration());

        Event::fake([WorkspaceCreated::class]);

        $this->post(route('register.store'), $this->registrationPayload());

        $user = User::query()->where('email', 'test@example.com')->firstOrFail();

        Event::assertDispatched(
            WorkspaceCreated::class,
            fn (WorkspaceCreated $e): bool => $e->workspace->user_id === $user->id,
        );
    }

    public function test_workspace_created_event_is_dispatched_exactly_once(): void
    {
        $this->skipUnlessFortifyHas(Features::registration());

        Event::fake([WorkspaceCreated::class]);

        $this->post(route('register.store'), $this->registrationPayload());

        Event::assertDispatchedTimes(WorkspaceCreated::class, 1);
    }

    // -----------------------------------------------------------------------
    // Listener guard — non-User authenticatables are silently skipped
    // -----------------------------------------------------------------------

    public function test_listener_ignores_non_user_authenticatables(): void
    {
        $nonUser = new class {};

        (new CreatePersonalWorkspace)->handle(new Registered($nonUser));

        $this->assertSame(0, Workspace::query()->count());
    }

    // -----------------------------------------------------------------------
    // Helpers
    // -----------------------------------------------------------------------

    /**
     * @return array<string, string>
     */
    private function registrationPayload(): array
    {
        return [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ];
    }
}
