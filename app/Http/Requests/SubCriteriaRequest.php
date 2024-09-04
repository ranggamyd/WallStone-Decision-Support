<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class SubCriteriaRequest extends FormRequest
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
            'value' => ['required', 'numeric', 'min:1', 'max:9'],
        ];

        if ($this->query('criteria_id')) $rules['criteria_id'] = Rule::exists('criterias', 'id')
            ->where('id', $this->query('criteria_id'));

        return $rules;
    }
}
