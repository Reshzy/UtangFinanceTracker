<?php

namespace Tests\Feature;

use App\Models\Contact;
use App\Models\User;
use App\Models\Workspace;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class ContactCrudTest extends TestCase
{
    use RefreshDatabase;

    public function test_guests_cannot_access_contacts(): void
    {
        $this->get(route('contacts.index'))->assertRedirect(route('login'));
    }

    public function test_contacts_index_displays_workspace_contacts(): void
    {
        [$user, $workspace] = $this->userWithWorkspace();
        Contact::factory()->for($workspace)->count(2)->create();

        $response = $this->actingAs($user)->get(route('contacts.index'));

        $response
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('contacts/index')
                ->has('contacts.data', 2)
                ->where('filters.status', 'active'));
    }

    public function test_contacts_index_can_filter_archived_contacts(): void
    {
        [$user, $workspace] = $this->userWithWorkspace();
        Contact::factory()->for($workspace)->create();
        Contact::factory()->archived()->for($workspace)->create();

        $response = $this->actingAs($user)->get(route('contacts.index', [
            'status' => 'archived',
        ]));

        $response
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->has('contacts.data', 1)
                ->where('filters.status', 'archived'));
    }

    public function test_user_can_create_a_contact(): void
    {
        [$user] = $this->userWithWorkspace();

        $response = $this->actingAs($user)->post(route('contacts.store'), $this->validPayload());

        $contact = Contact::query()->firstOrFail();

        $response
            ->assertSessionHasNoErrors()
            ->assertRedirect(route('contacts.show', $contact));

        $this->assertSame('Maria Santos', $contact->full_name);
        $this->assertSame(['VIP', 'Payday'], $contact->tags);
    }

    public function test_user_can_update_a_contact(): void
    {
        [$user, $workspace] = $this->userWithWorkspace();
        $contact = Contact::factory()->for($workspace)->create();

        $response = $this->actingAs($user)->patch(route('contacts.update', $contact), [
            ...$this->validPayload(),
            'full_name' => 'Updated Name',
        ]);

        $response
            ->assertSessionHasNoErrors()
            ->assertRedirect(route('contacts.show', $contact));

        $this->assertSame('Updated Name', $contact->fresh()->full_name);
    }

    public function test_user_can_view_a_contact(): void
    {
        [$user, $workspace] = $this->userWithWorkspace();
        $contact = Contact::factory()->for($workspace)->create([
            'full_name' => 'Maria Santos',
        ]);

        $response = $this->actingAs($user)->get(route('contacts.show', $contact));

        $response
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('contacts/show')
                ->where('contact.fullName', 'Maria Santos'));
    }

    public function test_user_can_archive_and_restore_a_contact(): void
    {
        [$user, $workspace] = $this->userWithWorkspace();
        $contact = Contact::factory()->for($workspace)->create();

        $this->actingAs($user)
            ->patch(route('contacts.archive', $contact))
            ->assertSessionHasNoErrors()
            ->assertRedirect();

        $this->assertNotNull($contact->fresh()->archived_at);

        $this->actingAs($user)
            ->patch(route('contacts.restore', $contact))
            ->assertSessionHasNoErrors()
            ->assertRedirect();

        $this->assertNull($contact->fresh()->archived_at);
    }

    public function test_user_can_soft_delete_a_contact(): void
    {
        [$user, $workspace] = $this->userWithWorkspace();
        $contact = Contact::factory()->for($workspace)->create();

        $this->actingAs($user)
            ->delete(route('contacts.destroy', $contact))
            ->assertSessionHasNoErrors()
            ->assertRedirect(route('contacts.index'));

        $this->assertSoftDeleted($contact);
    }

    public function test_user_cannot_access_another_users_contact(): void
    {
        [$user, $workspace] = $this->userWithWorkspace();
        [, $otherWorkspace] = $this->userWithWorkspace('other@example.com');
        $contact = Contact::factory()->for($otherWorkspace)->create();

        $this->actingAs($user)
            ->get(route('contacts.show', $contact))
            ->assertNotFound();
    }

    public function test_store_validates_required_fields(): void
    {
        [$user] = $this->userWithWorkspace();

        $response = $this->actingAs($user)
            ->from(route('contacts.create'))
            ->post(route('contacts.store'), []);

        $response
            ->assertSessionHasErrors([
                'full_name',
                'phone',
                'address',
                'relationship',
                'facebook',
            ])
            ->assertRedirect(route('contacts.create'));
    }

    /**
     * @return array{0: User, 1: Workspace}
     */
    private function userWithWorkspace(string $email = 'test@example.com'): array
    {
        $user = User::factory()->create(['email' => $email]);
        $workspace = Workspace::factory()->for($user)->create();

        return [$user, $workspace];
    }

    /**
     * @return array<string, mixed>
     */
    private function validPayload(): array
    {
        return [
            'full_name' => 'Maria Santos',
            'nickname' => 'Mari',
            'phone' => '09171234567',
            'address' => '123 Main Street, Manila',
            'relationship' => 'Friend',
            'facebook' => 'maria.santos',
            'birthday' => '1990-05-15',
            'notes' => 'Pays after payday.',
            'tags' => 'VIP, Payday',
        ];
    }
}
