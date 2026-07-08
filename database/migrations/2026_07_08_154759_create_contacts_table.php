<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('contacts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('workspace_id')->constrained()->cascadeOnDelete();
            $table->string('full_name');
            $table->string('nickname')->nullable();
            $table->string('phone')->nullable();
            $table->text('address')->nullable();
            $table->string('relationship')->nullable();
            $table->string('facebook')->nullable();
            $table->date('birthday')->nullable();
            $table->text('notes')->nullable();
            $table->json('tags')->nullable();
            $table->timestamp('archived_at')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->index('full_name');
            $table->index('phone');
            $table->index('archived_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contacts');
    }
};
