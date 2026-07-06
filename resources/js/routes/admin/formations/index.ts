import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\FormationController::index
* @see app/Http/Controllers/Admin/FormationController.php:16
* @route '/admin/formations'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/formations',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\FormationController::index
* @see app/Http/Controllers/Admin/FormationController.php:16
* @route '/admin/formations'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\FormationController::index
* @see app/Http/Controllers/Admin/FormationController.php:16
* @route '/admin/formations'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\FormationController::index
* @see app/Http/Controllers/Admin/FormationController.php:16
* @route '/admin/formations'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\FormationController::index
* @see app/Http/Controllers/Admin/FormationController.php:16
* @route '/admin/formations'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\FormationController::index
* @see app/Http/Controllers/Admin/FormationController.php:16
* @route '/admin/formations'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\FormationController::index
* @see app/Http/Controllers/Admin/FormationController.php:16
* @route '/admin/formations'
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
* @see \App\Http\Controllers\Admin\FormationController::create
* @see app/Http/Controllers/Admin/FormationController.php:59
* @route '/admin/formations/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/formations/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\FormationController::create
* @see app/Http/Controllers/Admin/FormationController.php:59
* @route '/admin/formations/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\FormationController::create
* @see app/Http/Controllers/Admin/FormationController.php:59
* @route '/admin/formations/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\FormationController::create
* @see app/Http/Controllers/Admin/FormationController.php:59
* @route '/admin/formations/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\FormationController::create
* @see app/Http/Controllers/Admin/FormationController.php:59
* @route '/admin/formations/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\FormationController::create
* @see app/Http/Controllers/Admin/FormationController.php:59
* @route '/admin/formations/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\FormationController::create
* @see app/Http/Controllers/Admin/FormationController.php:59
* @route '/admin/formations/create'
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
* @see \App\Http\Controllers\Admin\FormationController::store
* @see app/Http/Controllers/Admin/FormationController.php:64
* @route '/admin/formations'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/formations',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\FormationController::store
* @see app/Http/Controllers/Admin/FormationController.php:64
* @route '/admin/formations'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\FormationController::store
* @see app/Http/Controllers/Admin/FormationController.php:64
* @route '/admin/formations'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\FormationController::store
* @see app/Http/Controllers/Admin/FormationController.php:64
* @route '/admin/formations'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\FormationController::store
* @see app/Http/Controllers/Admin/FormationController.php:64
* @route '/admin/formations'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Admin\FormationController::show
* @see app/Http/Controllers/Admin/FormationController.php:0
* @route '/admin/formations/{formation}'
*/
export const show = (args: { formation: string | number } | [formation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/formations/{formation}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\FormationController::show
* @see app/Http/Controllers/Admin/FormationController.php:0
* @route '/admin/formations/{formation}'
*/
show.url = (args: { formation: string | number } | [formation: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { formation: args }
    }

    if (Array.isArray(args)) {
        args = {
            formation: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        formation: args.formation,
    }

    return show.definition.url
            .replace('{formation}', parsedArgs.formation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\FormationController::show
* @see app/Http/Controllers/Admin/FormationController.php:0
* @route '/admin/formations/{formation}'
*/
show.get = (args: { formation: string | number } | [formation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\FormationController::show
* @see app/Http/Controllers/Admin/FormationController.php:0
* @route '/admin/formations/{formation}'
*/
show.head = (args: { formation: string | number } | [formation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\FormationController::show
* @see app/Http/Controllers/Admin/FormationController.php:0
* @route '/admin/formations/{formation}'
*/
const showForm = (args: { formation: string | number } | [formation: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\FormationController::show
* @see app/Http/Controllers/Admin/FormationController.php:0
* @route '/admin/formations/{formation}'
*/
showForm.get = (args: { formation: string | number } | [formation: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\FormationController::show
* @see app/Http/Controllers/Admin/FormationController.php:0
* @route '/admin/formations/{formation}'
*/
showForm.head = (args: { formation: string | number } | [formation: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\FormationController::edit
* @see app/Http/Controllers/Admin/FormationController.php:128
* @route '/admin/formations/{formation}/edit'
*/
export const edit = (args: { formation: number | { id: number } } | [formation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/formations/{formation}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\FormationController::edit
* @see app/Http/Controllers/Admin/FormationController.php:128
* @route '/admin/formations/{formation}/edit'
*/
edit.url = (args: { formation: number | { id: number } } | [formation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { formation: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { formation: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            formation: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        formation: typeof args.formation === 'object'
        ? args.formation.id
        : args.formation,
    }

    return edit.definition.url
            .replace('{formation}', parsedArgs.formation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\FormationController::edit
* @see app/Http/Controllers/Admin/FormationController.php:128
* @route '/admin/formations/{formation}/edit'
*/
edit.get = (args: { formation: number | { id: number } } | [formation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\FormationController::edit
* @see app/Http/Controllers/Admin/FormationController.php:128
* @route '/admin/formations/{formation}/edit'
*/
edit.head = (args: { formation: number | { id: number } } | [formation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\FormationController::edit
* @see app/Http/Controllers/Admin/FormationController.php:128
* @route '/admin/formations/{formation}/edit'
*/
const editForm = (args: { formation: number | { id: number } } | [formation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\FormationController::edit
* @see app/Http/Controllers/Admin/FormationController.php:128
* @route '/admin/formations/{formation}/edit'
*/
editForm.get = (args: { formation: number | { id: number } } | [formation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\FormationController::edit
* @see app/Http/Controllers/Admin/FormationController.php:128
* @route '/admin/formations/{formation}/edit'
*/
editForm.head = (args: { formation: number | { id: number } } | [formation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\FormationController::update
* @see app/Http/Controllers/Admin/FormationController.php:150
* @route '/admin/formations/{formation}'
*/
export const update = (args: { formation: number | { id: number } } | [formation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/formations/{formation}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\FormationController::update
* @see app/Http/Controllers/Admin/FormationController.php:150
* @route '/admin/formations/{formation}'
*/
update.url = (args: { formation: number | { id: number } } | [formation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { formation: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { formation: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            formation: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        formation: typeof args.formation === 'object'
        ? args.formation.id
        : args.formation,
    }

    return update.definition.url
            .replace('{formation}', parsedArgs.formation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\FormationController::update
* @see app/Http/Controllers/Admin/FormationController.php:150
* @route '/admin/formations/{formation}'
*/
update.put = (args: { formation: number | { id: number } } | [formation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\FormationController::update
* @see app/Http/Controllers/Admin/FormationController.php:150
* @route '/admin/formations/{formation}'
*/
update.patch = (args: { formation: number | { id: number } } | [formation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Admin\FormationController::update
* @see app/Http/Controllers/Admin/FormationController.php:150
* @route '/admin/formations/{formation}'
*/
const updateForm = (args: { formation: number | { id: number } } | [formation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\FormationController::update
* @see app/Http/Controllers/Admin/FormationController.php:150
* @route '/admin/formations/{formation}'
*/
updateForm.put = (args: { formation: number | { id: number } } | [formation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\FormationController::update
* @see app/Http/Controllers/Admin/FormationController.php:150
* @route '/admin/formations/{formation}'
*/
updateForm.patch = (args: { formation: number | { id: number } } | [formation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\FormationController::destroy
* @see app/Http/Controllers/Admin/FormationController.php:216
* @route '/admin/formations/{formation}'
*/
export const destroy = (args: { formation: number | { id: number } } | [formation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/formations/{formation}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\FormationController::destroy
* @see app/Http/Controllers/Admin/FormationController.php:216
* @route '/admin/formations/{formation}'
*/
destroy.url = (args: { formation: number | { id: number } } | [formation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { formation: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { formation: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            formation: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        formation: typeof args.formation === 'object'
        ? args.formation.id
        : args.formation,
    }

    return destroy.definition.url
            .replace('{formation}', parsedArgs.formation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\FormationController::destroy
* @see app/Http/Controllers/Admin/FormationController.php:216
* @route '/admin/formations/{formation}'
*/
destroy.delete = (args: { formation: number | { id: number } } | [formation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Admin\FormationController::destroy
* @see app/Http/Controllers/Admin/FormationController.php:216
* @route '/admin/formations/{formation}'
*/
const destroyForm = (args: { formation: number | { id: number } } | [formation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\FormationController::destroy
* @see app/Http/Controllers/Admin/FormationController.php:216
* @route '/admin/formations/{formation}'
*/
destroyForm.delete = (args: { formation: number | { id: number } } | [formation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\FormationController::toggleActive
* @see app/Http/Controllers/Admin/FormationController.php:250
* @route '/admin/formations/{formation}/toggle-active'
*/
export const toggleActive = (args: { formation: number | { id: number } } | [formation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: toggleActive.url(args, options),
    method: 'post',
})

toggleActive.definition = {
    methods: ["post"],
    url: '/admin/formations/{formation}/toggle-active',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\FormationController::toggleActive
* @see app/Http/Controllers/Admin/FormationController.php:250
* @route '/admin/formations/{formation}/toggle-active'
*/
toggleActive.url = (args: { formation: number | { id: number } } | [formation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { formation: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { formation: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            formation: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        formation: typeof args.formation === 'object'
        ? args.formation.id
        : args.formation,
    }

    return toggleActive.definition.url
            .replace('{formation}', parsedArgs.formation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\FormationController::toggleActive
* @see app/Http/Controllers/Admin/FormationController.php:250
* @route '/admin/formations/{formation}/toggle-active'
*/
toggleActive.post = (args: { formation: number | { id: number } } | [formation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: toggleActive.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\FormationController::toggleActive
* @see app/Http/Controllers/Admin/FormationController.php:250
* @route '/admin/formations/{formation}/toggle-active'
*/
const toggleActiveForm = (args: { formation: number | { id: number } } | [formation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: toggleActive.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\FormationController::toggleActive
* @see app/Http/Controllers/Admin/FormationController.php:250
* @route '/admin/formations/{formation}/toggle-active'
*/
toggleActiveForm.post = (args: { formation: number | { id: number } } | [formation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: toggleActive.url(args, options),
    method: 'post',
})

toggleActive.form = toggleActiveForm

const formations = {
    index: Object.assign(index, index),
    create: Object.assign(create, create),
    store: Object.assign(store, store),
    show: Object.assign(show, show),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
    toggleActive: Object.assign(toggleActive, toggleActive),
}

export default formations