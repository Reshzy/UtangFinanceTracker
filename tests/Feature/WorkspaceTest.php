<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Workspace;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class WorkspaceTest extends TestCase
{
    use RefreshDatabase;

    public function test_workspace_schema_uses_documented_defaults(): void
    {
        $user = User::factory()->create();

        $workspaceId = DB::table('workspaces')->insertGetId([
            'user_id' => $user->id,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $workspace = Workspace::query()->findOrFail($workspaceId);

        $this->assertModelExists($workspace);
        $this->assertSame('Personal', $workspace->name);
        $this->assertSame('PHP', $workspace->currency_code);
        $this->assertNull($workspace->timezone);
    }

    public function test_workspace_belongs_to_a_user(): void
    {
        $user = User::factory()->create();
        $workspace = Workspace::factory()->for($user)->create();

        $this->assertTrue($workspace->user->is($user));
        $this->assertTrue($user->workspaces()->whereKey($workspace->getKey())->exists());
    }
}
