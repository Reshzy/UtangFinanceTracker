<?php

namespace Database\Factories;

use App\Enums\WalletType;
use App\Models\Wallet;
use App\Models\Workspace;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Wallet>
 */
class WalletFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'workspace_id' => Workspace::factory(),
            'name' => 'Cash',
            'type' => WalletType::Cash,
            'is_default' => true,
        ];
    }
}
