<?php

namespace Tests\Feature\Auth;

use App\Enums\WalletType;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Fortify\Features;
use Tests\TestCase;

class RegistrationTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->skipUnlessFortifyHas(Features::registration());
    }

    public function test_registration_screen_can_be_rendered()
    {
        $response = $this->get(route('register'));

        $response->assertOk();
    }

    public function test_new_users_can_register()
    {
        $response = $this->post(route('register.store'), [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);

        $this->assertAuthenticated();
        $response->assertRedirect(route('dashboard', absolute: false));

        $user = User::query()->where('email', 'test@example.com')->firstOrFail();
        $workspace = $user->workspaces()->firstOrFail();
        $wallet = $workspace->wallets()->firstOrFail();

        $this->assertSame(1, $user->workspaces()->count());
        $this->assertSame('Personal', $workspace->name);
        $this->assertSame('PHP', $workspace->currency_code);
        $this->assertSame('Cash', $wallet->name);
        $this->assertSame(WalletType::Cash, $wallet->type);
        $this->assertTrue($wallet->is_default);
    }
}
