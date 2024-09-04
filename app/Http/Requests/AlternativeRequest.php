<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class AlternativeRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'code' => [
                'required',
                Rule::unique('alternatives')->ignore($this->alternative ? $this->alternative->id : null),
            ],
            'name' => ['required'],
            'products' => ['nullable', 'array', Rule::exists('products', 'id')],
            'description' => ['nullable'],
        ];
    }
}
