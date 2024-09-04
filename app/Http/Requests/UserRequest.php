<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;
use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules = [
            'name' => ['required'],
            'username' => [
                'required',
                Rule::unique('users')->ignore($this->user ? $this->user->id : null),
            ],
            'email' => [
                'required',
                'email',
                Rule::unique('users')->ignore($this->user ? $this->user->id : null),
            ]
        ];

        if ($this->filled('password')) $rules['password'] = [Password::defaults(), 'confirmed'];

        return $rules;
    }
}