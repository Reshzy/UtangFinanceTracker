<?php

namespace App\Policies;

use App\Models\Contact;
use App\Models\User;

class ContactPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->workspaces()->exists();
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Contact $contact): bool
    {
        return $this->ownsContact($user, $contact);
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->workspaces()->exists();
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Contact $contact): bool
    {
        return $this->ownsContact($user, $contact);
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Contact $contact): bool
    {
        return $this->ownsContact($user, $contact);
    }

    /**
     * Determine whether the user can archive the model.
     */
    public function archive(User $user, Contact $contact): bool
    {
        return $this->ownsContact($user, $contact);
    }

    /**
     * Determine whether the user can restore the model from archive.
     */
    public function restoreArchive(User $user, Contact $contact): bool
    {
        return $this->ownsContact($user, $contact);
    }

    /**
     * Determine whether the user can restore the model from soft delete.
     */
    public function restore(User $user, Contact $contact): bool
    {
        return $this->ownsContact($user, $contact);
    }

    protected function ownsContact(User $user, Contact $contact): bool
    {
        return $user->workspaces()
            ->whereKey($contact->workspace_id)
            ->exists();
    }
}
