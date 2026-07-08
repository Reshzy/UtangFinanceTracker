<?php

namespace Database\Seeders;

use App\Models\Contact;
use App\Models\Workspace;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ContactSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Workspace::query()->each(function (Workspace $workspace): void {
            Contact::factory()
                ->count(5)
                ->for($workspace)
                ->create();

            Contact::factory()
                ->archived()
                ->for($workspace)
                ->create();
        });
    }
}
