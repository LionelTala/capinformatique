import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\CoursController::vagues
* @see app/Http/Controllers/Admin/CoursController.php:90
* @route '/admin/cours/vagues/{formationId}'
*/
export const vagues = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: vagues.url(args, options),
    method: 'get',
})

vagues.definition = {
    methods: ["get","head"],
    url: '/admin/cours/vagues/{formationId}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\CoursController::vagues
* @see app/Http/Controllers/Admin/CoursController.php:90
* @route '/admin/cours/vagues/{formationId}'
*/
vagues.url = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { formationId: args }
    }

    if (Array.isArray(args)) {
        args = {
            formationId: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        formationId: args.formationId,
    }

    return vagues.definition.url
            .replace('{formationId}', parsedArgs.formationId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CoursController::vagues
* @see app/Http/Controllers/Admin/CoursController.php:90
* @route '/admin/cours/vagues/{formationId}'
*/
vagues.get = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: vagues.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CoursController::vagues
* @see app/Http/Controllers/Admin/CoursController.php:90
* @route '/admin/cours/vagues/{formationId}'
*/
vagues.head = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: vagues.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\CoursController::vagues
* @see app/Http/Controllers/Admin/CoursController.php:90
* @route '/admin/cours/vagues/{formationId}'
*/
const vaguesForm = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: vagues.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CoursController::vagues
* @see app/Http/Controllers/Admin/CoursController.php:90
* @route '/admin/cours/vagues/{formationId}'
*/
vaguesForm.get = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: vagues.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CoursController::vagues
* @see app/Http/Controllers/Admin/CoursController.php:90
* @route '/admin/cours/vagues/{formationId}'
*/
vaguesForm.head = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: vagues.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

vagues.form = vaguesForm

/**
* @see \App\Http\Controllers\Admin\CoursController::certifications
* @see app/Http/Controllers/Admin/CoursController.php:107
* @route '/admin/cours/certifications/{formationId}'
*/
export const certifications = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: certifications.url(args, options),
    method: 'get',
})

certifications.definition = {
    methods: ["get","head"],
    url: '/admin/cours/certifications/{formationId}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\CoursController::certifications
* @see app/Http/Controllers/Admin/CoursController.php:107
* @route '/admin/cours/certifications/{formationId}'
*/
certifications.url = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { formationId: args }
    }

    if (Array.isArray(args)) {
        args = {
            formationId: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        formationId: args.formationId,
    }

    return certifications.definition.url
            .replace('{formationId}', parsedArgs.formationId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CoursController::certifications
* @see app/Http/Controllers/Admin/CoursController.php:107
* @route '/admin/cours/certifications/{formationId}'
*/
certifications.get = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: certifications.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CoursController::certifications
* @see app/Http/Controllers/Admin/CoursController.php:107
* @route '/admin/cours/certifications/{formationId}'
*/
certifications.head = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: certifications.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\CoursController::certifications
* @see app/Http/Controllers/Admin/CoursController.php:107
* @route '/admin/cours/certifications/{formationId}'
*/
const certificationsForm = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: certifications.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CoursController::certifications
* @see app/Http/Controllers/Admin/CoursController.php:107
* @route '/admin/cours/certifications/{formationId}'
*/
certificationsForm.get = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: certifications.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CoursController::certifications
* @see app/Http/Controllers/Admin/CoursController.php:107
* @route '/admin/cours/certifications/{formationId}'
*/
certificationsForm.head = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: certifications.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

certifications.form = certificationsForm

/**
* @see \App\Http\Controllers\Admin\CoursController::index
* @see app/Http/Controllers/Admin/CoursController.php:25
* @route '/admin/cours'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/cours',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\CoursController::index
* @see app/Http/Controllers/Admin/CoursController.php:25
* @route '/admin/cours'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CoursController::index
* @see app/Http/Controllers/Admin/CoursController.php:25
* @route '/admin/cours'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CoursController::index
* @see app/Http/Controllers/Admin/CoursController.php:25
* @route '/admin/cours'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\CoursController::index
* @see app/Http/Controllers/Admin/CoursController.php:25
* @route '/admin/cours'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CoursController::index
* @see app/Http/Controllers/Admin/CoursController.php:25
* @route '/admin/cours'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CoursController::index
* @see app/Http/Controllers/Admin/CoursController.php:25
* @route '/admin/cours'
*/
indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index.form = indexForm

/**
* @see \App\Http\Controllers\Admin\CoursController::create
* @see app/Http/Controllers/Admin/CoursController.php:72
* @route '/admin/cours/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/cours/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\CoursController::create
* @see app/Http/Controllers/Admin/CoursController.php:72
* @route '/admin/cours/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CoursController::create
* @see app/Http/Controllers/Admin/CoursController.php:72
* @route '/admin/cours/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CoursController::create
* @see app/Http/Controllers/Admin/CoursController.php:72
* @route '/admin/cours/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\CoursController::create
* @see app/Http/Controllers/Admin/CoursController.php:72
* @route '/admin/cours/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CoursController::create
* @see app/Http/Controllers/Admin/CoursController.php:72
* @route '/admin/cours/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CoursController::create
* @see app/Http/Controllers/Admin/CoursController.php:72
* @route '/admin/cours/create'
*/
createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

create.form = createForm

/**
* @see \App\Http\Controllers\Admin\CoursController::store
* @see app/Http/Controllers/Admin/CoursController.php:123
* @route '/admin/cours'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/cours',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\CoursController::store
* @see app/Http/Controllers/Admin/CoursController.php:123
* @route '/admin/cours'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CoursController::store
* @see app/Http/Controllers/Admin/CoursController.php:123
* @route '/admin/cours'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\CoursController::store
* @see app/Http/Controllers/Admin/CoursController.php:123
* @route '/admin/cours'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\CoursController::store
* @see app/Http/Controllers/Admin/CoursController.php:123
* @route '/admin/cours'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Admin\CoursController::show
* @see app/Http/Controllers/Admin/CoursController.php:284
* @route '/admin/cours/{cour}'
*/
export const show = (args: { cour: string | number } | [cour: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/cours/{cour}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\CoursController::show
* @see app/Http/Controllers/Admin/CoursController.php:284
* @route '/admin/cours/{cour}'
*/
show.url = (args: { cour: string | number } | [cour: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { cour: args }
    }

    if (Array.isArray(args)) {
        args = {
            cour: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        cour: args.cour,
    }

    return show.definition.url
            .replace('{cour}', parsedArgs.cour.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CoursController::show
* @see app/Http/Controllers/Admin/CoursController.php:284
* @route '/admin/cours/{cour}'
*/
show.get = (args: { cour: string | number } | [cour: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CoursController::show
* @see app/Http/Controllers/Admin/CoursController.php:284
* @route '/admin/cours/{cour}'
*/
show.head = (args: { cour: string | number } | [cour: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\CoursController::show
* @see app/Http/Controllers/Admin/CoursController.php:284
* @route '/admin/cours/{cour}'
*/
const showForm = (args: { cour: string | number } | [cour: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CoursController::show
* @see app/Http/Controllers/Admin/CoursController.php:284
* @route '/admin/cours/{cour}'
*/
showForm.get = (args: { cour: string | number } | [cour: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CoursController::show
* @see app/Http/Controllers/Admin/CoursController.php:284
* @route '/admin/cours/{cour}'
*/
showForm.head = (args: { cour: string | number } | [cour: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

/**
* @see \App\Http\Controllers\Admin\CoursController::edit
* @see app/Http/Controllers/Admin/CoursController.php:338
* @route '/admin/cours/{cour}/edit'
*/
export const edit = (args: { cour: string | number } | [cour: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/cours/{cour}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\CoursController::edit
* @see app/Http/Controllers/Admin/CoursController.php:338
* @route '/admin/cours/{cour}/edit'
*/
edit.url = (args: { cour: string | number } | [cour: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { cour: args }
    }

    if (Array.isArray(args)) {
        args = {
            cour: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        cour: args.cour,
    }

    return edit.definition.url
            .replace('{cour}', parsedArgs.cour.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CoursController::edit
* @see app/Http/Controllers/Admin/CoursController.php:338
* @route '/admin/cours/{cour}/edit'
*/
edit.get = (args: { cour: string | number } | [cour: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CoursController::edit
* @see app/Http/Controllers/Admin/CoursController.php:338
* @route '/admin/cours/{cour}/edit'
*/
edit.head = (args: { cour: string | number } | [cour: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\CoursController::edit
* @see app/Http/Controllers/Admin/CoursController.php:338
* @route '/admin/cours/{cour}/edit'
*/
const editForm = (args: { cour: string | number } | [cour: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CoursController::edit
* @see app/Http/Controllers/Admin/CoursController.php:338
* @route '/admin/cours/{cour}/edit'
*/
editForm.get = (args: { cour: string | number } | [cour: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CoursController::edit
* @see app/Http/Controllers/Admin/CoursController.php:338
* @route '/admin/cours/{cour}/edit'
*/
editForm.head = (args: { cour: string | number } | [cour: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

edit.form = editForm

/**
* @see \App\Http\Controllers\Admin\CoursController::update
* @see app/Http/Controllers/Admin/CoursController.php:370
* @route '/admin/cours/{cour}'
*/
export const update = (args: { cour: string | number } | [cour: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/cours/{cour}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\CoursController::update
* @see app/Http/Controllers/Admin/CoursController.php:370
* @route '/admin/cours/{cour}'
*/
update.url = (args: { cour: string | number } | [cour: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { cour: args }
    }

    if (Array.isArray(args)) {
        args = {
            cour: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        cour: args.cour,
    }

    return update.definition.url
            .replace('{cour}', parsedArgs.cour.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CoursController::update
* @see app/Http/Controllers/Admin/CoursController.php:370
* @route '/admin/cours/{cour}'
*/
update.put = (args: { cour: string | number } | [cour: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\CoursController::update
* @see app/Http/Controllers/Admin/CoursController.php:370
* @route '/admin/cours/{cour}'
*/
update.patch = (args: { cour: string | number } | [cour: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Admin\CoursController::update
* @see app/Http/Controllers/Admin/CoursController.php:370
* @route '/admin/cours/{cour}'
*/
const updateForm = (args: { cour: string | number } | [cour: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\CoursController::update
* @see app/Http/Controllers/Admin/CoursController.php:370
* @route '/admin/cours/{cour}'
*/
updateForm.put = (args: { cour: string | number } | [cour: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\CoursController::update
* @see app/Http/Controllers/Admin/CoursController.php:370
* @route '/admin/cours/{cour}'
*/
updateForm.patch = (args: { cour: string | number } | [cour: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

/**
* @see \App\Http\Controllers\Admin\CoursController::destroy
* @see app/Http/Controllers/Admin/CoursController.php:458
* @route '/admin/cours/{cour}'
*/
export const destroy = (args: { cour: string | number } | [cour: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/cours/{cour}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\CoursController::destroy
* @see app/Http/Controllers/Admin/CoursController.php:458
* @route '/admin/cours/{cour}'
*/
destroy.url = (args: { cour: string | number } | [cour: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { cour: args }
    }

    if (Array.isArray(args)) {
        args = {
            cour: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        cour: args.cour,
    }

    return destroy.definition.url
            .replace('{cour}', parsedArgs.cour.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CoursController::destroy
* @see app/Http/Controllers/Admin/CoursController.php:458
* @route '/admin/cours/{cour}'
*/
destroy.delete = (args: { cour: string | number } | [cour: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Admin\CoursController::destroy
* @see app/Http/Controllers/Admin/CoursController.php:458
* @route '/admin/cours/{cour}'
*/
const destroyForm = (args: { cour: string | number } | [cour: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\CoursController::destroy
* @see app/Http/Controllers/Admin/CoursController.php:458
* @route '/admin/cours/{cour}'
*/
destroyForm.delete = (args: { cour: string | number } | [cour: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

/**
* @see \App\Http\Controllers\Admin\CoursController::toggleActive
* @see app/Http/Controllers/Admin/CoursController.php:499
* @route '/admin/cours/{cours}/toggle-active'
*/
export const toggleActive = (args: { cours: number | { id: number } } | [cours: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: toggleActive.url(args, options),
    method: 'post',
})

toggleActive.definition = {
    methods: ["post"],
    url: '/admin/cours/{cours}/toggle-active',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\CoursController::toggleActive
* @see app/Http/Controllers/Admin/CoursController.php:499
* @route '/admin/cours/{cours}/toggle-active'
*/
toggleActive.url = (args: { cours: number | { id: number } } | [cours: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { cours: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { cours: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            cours: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        cours: typeof args.cours === 'object'
        ? args.cours.id
        : args.cours,
    }

    return toggleActive.definition.url
            .replace('{cours}', parsedArgs.cours.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CoursController::toggleActive
* @see app/Http/Controllers/Admin/CoursController.php:499
* @route '/admin/cours/{cours}/toggle-active'
*/
toggleActive.post = (args: { cours: number | { id: number } } | [cours: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: toggleActive.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\CoursController::toggleActive
* @see app/Http/Controllers/Admin/CoursController.php:499
* @route '/admin/cours/{cours}/toggle-active'
*/
const toggleActiveForm = (args: { cours: number | { id: number } } | [cours: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: toggleActive.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\CoursController::toggleActive
* @see app/Http/Controllers/Admin/CoursController.php:499
* @route '/admin/cours/{cours}/toggle-active'
*/
toggleActiveForm.post = (args: { cours: number | { id: number } } | [cours: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: toggleActive.url(args, options),
    method: 'post',
})

toggleActive.form = toggleActiveForm

/**
* @see \App\Http\Controllers\Admin\CoursController::resendNotifications
* @see app/Http/Controllers/Admin/CoursController.php:526
* @route '/admin/cours/{cours}/resend-notifications'
*/
export const resendNotifications = (args: { cours: number | { id: number } } | [cours: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: resendNotifications.url(args, options),
    method: 'post',
})

resendNotifications.definition = {
    methods: ["post"],
    url: '/admin/cours/{cours}/resend-notifications',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\CoursController::resendNotifications
* @see app/Http/Controllers/Admin/CoursController.php:526
* @route '/admin/cours/{cours}/resend-notifications'
*/
resendNotifications.url = (args: { cours: number | { id: number } } | [cours: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { cours: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { cours: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            cours: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        cours: typeof args.cours === 'object'
        ? args.cours.id
        : args.cours,
    }

    return resendNotifications.definition.url
            .replace('{cours}', parsedArgs.cours.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CoursController::resendNotifications
* @see app/Http/Controllers/Admin/CoursController.php:526
* @route '/admin/cours/{cours}/resend-notifications'
*/
resendNotifications.post = (args: { cours: number | { id: number } } | [cours: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: resendNotifications.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\CoursController::resendNotifications
* @see app/Http/Controllers/Admin/CoursController.php:526
* @route '/admin/cours/{cours}/resend-notifications'
*/
const resendNotificationsForm = (args: { cours: number | { id: number } } | [cours: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: resendNotifications.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\CoursController::resendNotifications
* @see app/Http/Controllers/Admin/CoursController.php:526
* @route '/admin/cours/{cours}/resend-notifications'
*/
resendNotificationsForm.post = (args: { cours: number | { id: number } } | [cours: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: resendNotifications.url(args, options),
    method: 'post',
})

resendNotifications.form = resendNotificationsForm

const cours = {
    vagues: Object.assign(vagues, vagues),
    certifications: Object.assign(certifications, certifications),
    index: Object.assign(index, index),
    create: Object.assign(create, create),
    store: Object.assign(store, store),
    show: Object.assign(show, show),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
    toggleActive: Object.assign(toggleActive, toggleActive),
    resendNotifications: Object.assign(resendNotifications, resendNotifications),
}

export default cours