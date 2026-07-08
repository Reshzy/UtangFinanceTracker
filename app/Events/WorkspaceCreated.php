<?php

namespace App\Events;

use App\Models\Workspace;

class WorkspaceCreated
{
    public function __construct(public readonly Workspace $workspace) {}
}
