<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
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
                Rule::unique('products')->ignore($this->product ? $this->product->id : null),
            ],
            'name' => ['required'],
            'alternatives' => ['nullable', 'array', Rule::exists('alternatives', 'id')],
            'description' => ['nullable'],
        ];
    }
}
