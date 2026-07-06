<?php

use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\Log;

Broadcast::channel('admin-notifications', function ($user) {
    Log::info('Auth channel admin-notifications', [
        'user_id' => $user?->id,
        'is_admin' => $user?->isAdmin(),
    ]);

    return $user->isAdmin();
});
