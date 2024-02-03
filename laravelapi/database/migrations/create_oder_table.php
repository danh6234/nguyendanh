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
        Schema::create('Oder', function (Blueprint $table) {
            $table->increments('ID');
            $table->string('FullName', 100)->nullable();
            $table->string('Address', 150)->nullable();
            $table->string('Email', 50)->nullable();
            $table->string('Tel', 50)->nullable();
            $table->integer('PaymentMethodID')->unsigned()->nullable();
            $table->dateTime('CreatedDate')->nullable();
            $table->unsignedBigInteger('emp_id');
            $table->unsignedBigInteger('member_id');

            $table->foreign('emp_id')->references('emp_id')->on('employees')->onDelete('cascade');
            $table->foreign('member_id')->references('id')->on('members_tables')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('Oder');
    }
};
