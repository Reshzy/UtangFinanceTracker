<?php

namespace Tests\Feature;

use App\Models\Contact;
use App\Models\Workspace;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ContactTest extends TestCase
{
    use RefreshDatabase;

    public function test_contact_belongs_to_a_workspace(): void
    {
        $workspace = Workspace::factory()->create();
        $contact = Contact::factory()->for($workspace)->create();

        $this->assertTrue($contact->workspace->is($workspace));
        $this->assertTrue($workspace->contacts()->whereKey($contact->getKey())->exists());
    }

    public function test_contact_casts_tags_as_array(): void
    {
        $contact = Contact::factory()->create([
            'tags' => ['VIP', 'Payday'],
        ]);

        $contact->refresh();

        $this->assertSame(['VIP', 'Payday'], $contact->tags);
    }

    public function test_contact_factory_creates_active_contact_by_default(): void
    {
        $contact = Contact::factory()->create();

        $this->assertModelExists($contact);
        $this->assertNull($contact->archived_at);
        $this->assertNull($contact->deleted_at);
    }

    public function test_contact_factory_archived_state_sets_archived_at(): void
    {
        $contact = Contact::factory()->archived()->create();

        $this->assertNotNull($contact->archived_at);
    }

    public function test_contact_supports_soft_deletes(): void
    {
        $contact = Contact::factory()->create();

        $contact->delete();

        $this->assertSoftDeleted($contact);
        $this->assertNull(Contact::query()->find($contact->getKey()));
        $this->assertNotNull(Contact::withTrashed()->find($contact->getKey()));
    }
}
