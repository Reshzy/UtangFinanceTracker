<?php

namespace Database\Factories;

use App\Models\Contact;
use App\Models\Workspace;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Contact>
 */
class ContactFactory extends Factory
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
            'full_name' => fake()->name(),
            'nickname' => fake()->optional()->firstName(),
            'phone' => fake()->optional()->numerify('09#########'),
            'address' => fake()->optional()->address(),
            'relationship' => fake()->optional()->randomElement([
                'Friend',
                'Family',
                'Colleague',
                'Neighbor',
                'Business Partner',
            ]),
            'facebook' => fake()->optional()->userName(),
            'birthday' => fake()->optional()->date(),
            'notes' => fake()->optional()->sentence(),
            'tags' => fake()->optional()->randomElements(
                ['Regular', 'VIP', 'Payday', 'GCash', 'Trusted'],
                fake()->numberBetween(1, 3),
            ),
            'archived_at' => null,
        ];
    }

    /**
     * Indicate that the contact is archived.
     */
    public function archived(): static
    {
        return $this->state(fn (array $attributes): array => [
            'archived_at' => now(),
        ]);
    }
}
