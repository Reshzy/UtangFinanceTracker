<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreContactRequest;
use App\Http\Requests\UpdateContactRequest;
use App\Http\Resources\ContactResource;
use App\Models\Contact;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $this->authorize('viewAny', Contact::class);

        $status = $request->string('status', 'active')->toString();

        $contacts = $request->user()
            ->personalWorkspace()
            ->contacts()
            ->when($status === 'active', fn ($query) => $query->active())
            ->when($status === 'archived', fn ($query) => $query->archived())
            ->orderBy('full_name')
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('contacts/index', [
            'contacts' => ContactResource::collection($contacts),
            'filters' => [
                'status' => $status,
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request): Response
    {
        $this->authorize('create', Contact::class);

        return Inertia::render('contacts/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreContactRequest $request): RedirectResponse
    {
        $contact = $request->user()
            ->personalWorkspace()
            ->contacts()
            ->create($request->validated());

        Inertia::flash('toast', [
            'type' => 'success',
            'message' => __('Contact created.'),
        ]);

        return to_route('contacts.show', $contact);
    }

    /**
     * Display the specified resource.
     */
    public function show(Contact $contact): Response
    {
        $this->authorize('view', $contact);

        return Inertia::render('contacts/show', [
            'contact' => ContactResource::make($contact)->resolve(),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Contact $contact): Response
    {
        $this->authorize('update', $contact);

        return Inertia::render('contacts/edit', [
            'contact' => ContactResource::make($contact)->resolve(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateContactRequest $request, Contact $contact): RedirectResponse
    {
        $contact->update($request->validated());

        Inertia::flash('toast', [
            'type' => 'success',
            'message' => __('Contact updated.'),
        ]);

        return to_route('contacts.show', $contact);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Contact $contact): RedirectResponse
    {
        $this->authorize('delete', $contact);

        $contact->delete();

        Inertia::flash('toast', [
            'type' => 'success',
            'message' => __('Contact deleted.'),
        ]);

        return to_route('contacts.index');
    }

    /**
     * Archive the specified contact.
     */
    public function archive(Request $request, Contact $contact): RedirectResponse
    {
        $this->authorize('archive', $contact);

        $contact->update([
            'archived_at' => now(),
        ]);

        Inertia::flash('toast', [
            'type' => 'success',
            'message' => __('Contact archived.'),
        ]);

        return back();
    }

    /**
     * Restore the specified contact from archive.
     */
    public function restoreArchive(Request $request, Contact $contact): RedirectResponse
    {
        $this->authorize('restoreArchive', $contact);

        $contact->update([
            'archived_at' => null,
        ]);

        Inertia::flash('toast', [
            'type' => 'success',
            'message' => __('Contact restored.'),
        ]);

        return back();
    }
}
