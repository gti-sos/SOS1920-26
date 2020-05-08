<<<<<<< HEAD

(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
var app = (function () {
    'use strict';

    function noop() { }
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function is_promise(value) {
        return value && typeof value === 'object' && typeof value.then === 'function';
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function validate_store(store, name) {
        if (store != null && typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe(store, ...callbacks) {
        if (store == null) {
            return noop;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function exclude_internal_props(props) {
        const result = {};
        for (const k in props)
            if (k[0] !== '$')
                result[k] = props[k];
        return result;
    }

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function set_attributes(node, attributes) {
        // @ts-ignore
        const descriptors = Object.getOwnPropertyDescriptors(node.__proto__);
        for (const key in attributes) {
            if (attributes[key] == null) {
                node.removeAttribute(key);
            }
            else if (key === 'style') {
                node.style.cssText = attributes[key];
            }
            else if (key === '__value' || descriptors[key] && descriptors[key].set) {
                node[key] = attributes[key];
            }
            else {
                attr(node, key, attributes[key]);
            }
        }
    }
    function to_number(value) {
        return value === '' ? undefined : +value;
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_input_value(input, value) {
        if (value != null || input.value) {
            input.value = value;
        }
    }
    function set_style(node, key, value, important) {
        node.style.setProperty(key, value, important ? 'important' : '');
    }
    function select_option(select, value) {
        for (let i = 0; i < select.options.length; i += 1) {
            const option = select.options[i];
            if (option.__value === value) {
                option.selected = true;
                return;
            }
        }
    }
    function select_options(select, value) {
        for (let i = 0; i < select.options.length; i += 1) {
            const option = select.options[i];
            option.selected = ~value.indexOf(option.__value);
        }
    }
    function select_value(select) {
        const selected_option = select.querySelector(':checked') || select.options[0];
        return selected_option && selected_option.__value;
    }
    function select_multiple_value(select) {
        return [].map.call(select.querySelectorAll(':checked'), option => option.__value);
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error(`Function called outside component initialization`);
        return current_component;
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }
    function createEventDispatcher() {
        const component = get_current_component();
        return (type, detail) => {
            const callbacks = component.$$.callbacks[type];
            if (callbacks) {
                // TODO are there situations where events could be dispatched
                // in a server (non-DOM) environment?
                const event = custom_event(type, detail);
                callbacks.slice().forEach(fn => {
                    fn.call(component, event);
                });
            }
        };
    }
    // TODO figure out if we still want to support
    // shorthand events, or if we want to implement
    // a real bubbling mechanism
    function bubble(component, event) {
        const callbacks = component.$$.callbacks[event.type];
        if (callbacks) {
            callbacks.slice().forEach(fn => fn(event));
        }
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    function add_flush_callback(fn) {
        flush_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }

    function handle_promise(promise, info) {
        const token = info.token = {};
        function update(type, index, key, value) {
            if (info.token !== token)
                return;
            info.resolved = value;
            let child_ctx = info.ctx;
            if (key !== undefined) {
                child_ctx = child_ctx.slice();
                child_ctx[key] = value;
            }
            const block = type && (info.current = type)(child_ctx);
            let needs_flush = false;
            if (info.block) {
                if (info.blocks) {
                    info.blocks.forEach((block, i) => {
                        if (i !== index && block) {
                            group_outros();
                            transition_out(block, 1, 1, () => {
                                info.blocks[i] = null;
                            });
                            check_outros();
                        }
                    });
                }
                else {
                    info.block.d(1);
                }
                block.c();
                transition_in(block, 1);
                block.m(info.mount(), info.anchor);
                needs_flush = true;
            }
            info.block = block;
            if (info.blocks)
                info.blocks[index] = block;
            if (needs_flush) {
                flush();
            }
        }
        if (is_promise(promise)) {
            const current_component = get_current_component();
            promise.then(value => {
                set_current_component(current_component);
                update(info.then, 1, info.value, value);
                set_current_component(null);
            }, error => {
                set_current_component(current_component);
                update(info.catch, 2, info.error, error);
                set_current_component(null);
            });
            // if we previously had a then/catch block, destroy it
            if (info.current !== info.pending) {
                update(info.pending, 0);
                return true;
            }
        }
        else {
            if (info.current !== info.then) {
                update(info.then, 1, info.value, promise);
                return true;
            }
            info.resolved = promise;
        }
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);

    function get_spread_update(levels, updates) {
        const update = {};
        const to_null_out = {};
        const accounted_for = { $$scope: 1 };
        let i = levels.length;
        while (i--) {
            const o = levels[i];
            const n = updates[i];
            if (n) {
                for (const key in o) {
                    if (!(key in n))
                        to_null_out[key] = 1;
                }
                for (const key in n) {
                    if (!accounted_for[key]) {
                        update[key] = n[key];
                        accounted_for[key] = 1;
                    }
                }
                levels[i] = n;
            }
            else {
                for (const key in o) {
                    accounted_for[key] = 1;
                }
            }
        }
        for (const key in to_null_out) {
            if (!(key in update))
                update[key] = undefined;
        }
        return update;
    }

    function bind(component, name, callback) {
        const index = component.$$.props[name];
        if (index !== undefined) {
            component.$$.bound[index] = callback;
            callback(component.$$.ctx[index]);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const prop_values = options.props || {};
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : []),
            // everything else
            callbacks: blank_object(),
            dirty
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, prop_values, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if ($$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor);
            flush();
        }
        set_current_component(parent_component);
    }
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set() {
            // overridden by instance, if it has props
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.21.0' }, detail)));
    }
    function append_dev(target, node) {
        dispatch_dev("SvelteDOMInsert", { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev("SvelteDOMInsert", { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev("SvelteDOMRemove", { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ["capture"] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev("SvelteDOMAddEventListener", { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev("SvelteDOMRemoveEventListener", { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev("SvelteDOMRemoveAttribute", { node, attribute });
        else
            dispatch_dev("SvelteDOMSetAttribute", { node, attribute, value });
    }
    function prop_dev(node, property, value) {
        node[property] = value;
        dispatch_dev("SvelteDOMSetProperty", { node, property, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.data === data)
            return;
        dispatch_dev("SvelteDOMSetData", { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error(`'target' is a required option`);
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn(`Component was already destroyed`); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    const subscriber_queue = [];
    /**
     * Creates a `Readable` store that allows reading by subscription.
     * @param value initial value
     * @param {StartStopNotifier}start start and stop notifications for subscriptions
     */
    function readable(value, start) {
        return {
            subscribe: writable(value, start).subscribe,
        };
    }
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = [];
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (let i = 0; i < subscribers.length; i += 1) {
                        const s = subscribers[i];
                        s[1]();
                        subscriber_queue.push(s, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.push(subscriber);
            if (subscribers.length === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                const index = subscribers.indexOf(subscriber);
                if (index !== -1) {
                    subscribers.splice(index, 1);
                }
                if (subscribers.length === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }
    function derived(stores, fn, initial_value) {
        const single = !Array.isArray(stores);
        const stores_array = single
            ? [stores]
            : stores;
        const auto = fn.length < 2;
        return readable(initial_value, (set) => {
            let inited = false;
            const values = [];
            let pending = 0;
            let cleanup = noop;
            const sync = () => {
                if (pending) {
                    return;
                }
                cleanup();
                const result = fn(single ? values[0] : values, set);
                if (auto) {
                    set(result);
                }
                else {
                    cleanup = is_function(result) ? result : noop;
                }
            };
            const unsubscribers = stores_array.map((store, i) => subscribe(store, (value) => {
                values[i] = value;
                pending &= ~(1 << i);
                if (inited) {
                    sync();
                }
            }, () => {
                pending |= (1 << i);
            }));
            inited = true;
            sync();
            return function stop() {
                run_all(unsubscribers);
                cleanup();
            };
        });
    }

    function regexparam (str, loose) {
    	if (str instanceof RegExp) return { keys:false, pattern:str };
    	var c, o, tmp, ext, keys=[], pattern='', arr = str.split('/');
    	arr[0] || arr.shift();

    	while (tmp = arr.shift()) {
    		c = tmp[0];
    		if (c === '*') {
    			keys.push('wild');
    			pattern += '/(.*)';
    		} else if (c === ':') {
    			o = tmp.indexOf('?', 1);
    			ext = tmp.indexOf('.', 1);
    			keys.push( tmp.substring(1, !!~o ? o : !!~ext ? ext : tmp.length) );
    			pattern += !!~o && !~ext ? '(?:/([^/]+?))?' : '/([^/]+?)';
    			if (!!~ext) pattern += (!!~o ? '?' : '') + '\\' + tmp.substring(ext);
    		} else {
    			pattern += '/' + tmp;
    		}
    	}

    	return {
    		keys: keys,
    		pattern: new RegExp('^' + pattern + (loose ? '(?=$|\/)' : '\/?$'), 'i')
    	};
    }

    /* node_modules\svelte-spa-router\Router.svelte generated by Svelte v3.21.0 */

    const { Error: Error_1, Object: Object_1, console: console_1 } = globals;

    // (209:0) {:else}
    function create_else_block(ctx) {
    	let switch_instance_anchor;
    	let current;
    	var switch_value = /*component*/ ctx[0];

    	function switch_props(ctx) {
    		return { $$inline: true };
    	}

    	if (switch_value) {
    		var switch_instance = new switch_value(switch_props());
    		switch_instance.$on("routeEvent", /*routeEvent_handler_1*/ ctx[10]);
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) {
    				mount_component(switch_instance, target, anchor);
    			}

    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (switch_value !== (switch_value = /*component*/ ctx[0])) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props());
    					switch_instance.$on("routeEvent", /*routeEvent_handler_1*/ ctx[10]);
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(209:0) {:else}",
    		ctx
    	});

    	return block;
    }

    // (207:0) {#if componentParams}
    function create_if_block(ctx) {
    	let switch_instance_anchor;
    	let current;
    	var switch_value = /*component*/ ctx[0];

    	function switch_props(ctx) {
    		return {
    			props: { params: /*componentParams*/ ctx[1] },
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		var switch_instance = new switch_value(switch_props(ctx));
    		switch_instance.$on("routeEvent", /*routeEvent_handler*/ ctx[9]);
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) {
    				mount_component(switch_instance, target, anchor);
    			}

    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const switch_instance_changes = {};
    			if (dirty & /*componentParams*/ 2) switch_instance_changes.params = /*componentParams*/ ctx[1];

    			if (switch_value !== (switch_value = /*component*/ ctx[0])) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props(ctx));
    					switch_instance.$on("routeEvent", /*routeEvent_handler*/ ctx[9]);
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(207:0) {#if componentParams}",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block, create_else_block];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*componentParams*/ ctx[1]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error_1("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function wrap(route, userData, ...conditions) {
    	// Check if we don't have userData
    	if (userData && typeof userData == "function") {
    		conditions = conditions && conditions.length ? conditions : [];
    		conditions.unshift(userData);
    		userData = undefined;
    	}

    	// Parameter route and each item of conditions must be functions
    	if (!route || typeof route != "function") {
    		throw Error("Invalid parameter route");
    	}

    	if (conditions && conditions.length) {
    		for (let i = 0; i < conditions.length; i++) {
    			if (!conditions[i] || typeof conditions[i] != "function") {
    				throw Error("Invalid parameter conditions[" + i + "]");
    			}
    		}
    	}

    	// Returns an object that contains all the functions to execute too
    	const obj = { route, userData };

    	if (conditions && conditions.length) {
    		obj.conditions = conditions;
    	}

    	// The _sveltesparouter flag is to confirm the object was created by this router
    	Object.defineProperty(obj, "_sveltesparouter", { value: true });

    	return obj;
    }

    /**
     * @typedef {Object} Location
     * @property {string} location - Location (page/view), for example `/book`
     * @property {string} [querystring] - Querystring from the hash, as a string not parsed
     */
    /**
     * Returns the current location from the hash.
     *
     * @returns {Location} Location object
     * @private
     */
    function getLocation() {
    	const hashPosition = window.location.href.indexOf("#/");

    	let location = hashPosition > -1
    	? window.location.href.substr(hashPosition + 1)
    	: "/";

    	// Check if there's a querystring
    	const qsPosition = location.indexOf("?");

    	let querystring = "";

    	if (qsPosition > -1) {
    		querystring = location.substr(qsPosition + 1);
    		location = location.substr(0, qsPosition);
    	}

    	return { location, querystring };
    }

    const loc = readable(getLocation(), // eslint-disable-next-line prefer-arrow-callback
    function start(set) {
    	const update = () => {
    		set(getLocation());
    	};

    	window.addEventListener("hashchange", update, false);

    	return function stop() {
    		window.removeEventListener("hashchange", update, false);
    	};
    });

    const location = derived(loc, $loc => $loc.location);
    const querystring = derived(loc, $loc => $loc.querystring);

    function push(location) {
    	if (!location || location.length < 1 || location.charAt(0) != "/" && location.indexOf("#/") !== 0) {
    		throw Error("Invalid parameter location");
    	}

    	// Execute this code when the current call stack is complete
    	return nextTickPromise(() => {
    		window.location.hash = (location.charAt(0) == "#" ? "" : "#") + location;
    	});
    }

    function pop() {
    	// Execute this code when the current call stack is complete
    	return nextTickPromise(() => {
    		window.history.back();
    	});
    }

    function replace(location) {
    	if (!location || location.length < 1 || location.charAt(0) != "/" && location.indexOf("#/") !== 0) {
    		throw Error("Invalid parameter location");
    	}

    	// Execute this code when the current call stack is complete
    	return nextTickPromise(() => {
    		const dest = (location.charAt(0) == "#" ? "" : "#") + location;

    		try {
    			window.history.replaceState(undefined, undefined, dest);
    		} catch(e) {
    			// eslint-disable-next-line no-console
    			console.warn("Caught exception while replacing the current page. If you're running this in the Svelte REPL, please note that the `replace` method might not work in this environment.");
    		}

    		// The method above doesn't trigger the hashchange event, so let's do that manually
    		window.dispatchEvent(new Event("hashchange"));
    	});
    }

    function link(node) {
    	// Only apply to <a> tags
    	if (!node || !node.tagName || node.tagName.toLowerCase() != "a") {
    		throw Error("Action \"link\" can only be used with <a> tags");
    	}

    	// Destination must start with '/'
    	const href = node.getAttribute("href");

    	if (!href || href.length < 1 || href.charAt(0) != "/") {
    		throw Error("Invalid value for \"href\" attribute");
    	}

    	// Add # to every href attribute
    	node.setAttribute("href", "#" + href);
    }

    function nextTickPromise(cb) {
    	return new Promise(resolve => {
    			setTimeout(
    				() => {
    					resolve(cb());
    				},
    				0
    			);
    		});
    }

    function instance($$self, $$props, $$invalidate) {
    	let $loc,
    		$$unsubscribe_loc = noop;

    	validate_store(loc, "loc");
    	component_subscribe($$self, loc, $$value => $$invalidate(4, $loc = $$value));
    	$$self.$$.on_destroy.push(() => $$unsubscribe_loc());
    	let { routes = {} } = $$props;
    	let { prefix = "" } = $$props;

    	/**
     * Container for a route: path, component
     */
    	class RouteItem {
    		/**
     * Initializes the object and creates a regular expression from the path, using regexparam.
     *
     * @param {string} path - Path to the route (must start with '/' or '*')
     * @param {SvelteComponent} component - Svelte component for the route
     */
    		constructor(path, component) {
    			if (!component || typeof component != "function" && (typeof component != "object" || component._sveltesparouter !== true)) {
    				throw Error("Invalid component object");
    			}

    			// Path must be a regular or expression, or a string starting with '/' or '*'
    			if (!path || typeof path == "string" && (path.length < 1 || path.charAt(0) != "/" && path.charAt(0) != "*") || typeof path == "object" && !(path instanceof RegExp)) {
    				throw Error("Invalid value for \"path\" argument");
    			}

    			const { pattern, keys } = regexparam(path);
    			this.path = path;

    			// Check if the component is wrapped and we have conditions
    			if (typeof component == "object" && component._sveltesparouter === true) {
    				this.component = component.route;
    				this.conditions = component.conditions || [];
    				this.userData = component.userData;
    			} else {
    				this.component = component;
    				this.conditions = [];
    				this.userData = undefined;
    			}

    			this._pattern = pattern;
    			this._keys = keys;
    		}

    		/**
     * Checks if `path` matches the current route.
     * If there's a match, will return the list of parameters from the URL (if any).
     * In case of no match, the method will return `null`.
     *
     * @param {string} path - Path to test
     * @returns {null|Object.<string, string>} List of paramters from the URL if there's a match, or `null` otherwise.
     */
    		match(path) {
    			// If there's a prefix, remove it before we run the matching
    			if (prefix && path.startsWith(prefix)) {
    				path = path.substr(prefix.length) || "/";
    			}

    			// Check if the pattern matches
    			const matches = this._pattern.exec(path);

    			if (matches === null) {
    				return null;
    			}

    			// If the input was a regular expression, this._keys would be false, so return matches as is
    			if (this._keys === false) {
    				return matches;
    			}

    			const out = {};
    			let i = 0;

    			while (i < this._keys.length) {
    				out[this._keys[i]] = matches[++i] || null;
    			}

    			return out;
    		}

    		/**
     * Dictionary with route details passed to the pre-conditions functions, as well as the `routeLoaded` and `conditionsFailed` events
     * @typedef {Object} RouteDetail
     * @property {SvelteComponent} component - Svelte component
     * @property {string} name - Name of the Svelte component
     * @property {string} location - Location path
     * @property {string} querystring - Querystring from the hash
     * @property {Object} [userData] - Custom data passed by the user
     */
    		/**
     * Executes all conditions (if any) to control whether the route can be shown. Conditions are executed in the order they are defined, and if a condition fails, the following ones aren't executed.
     * 
     * @param {RouteDetail} detail - Route detail
     * @returns {bool} Returns true if all the conditions succeeded
     */
    		checkConditions(detail) {
    			for (let i = 0; i < this.conditions.length; i++) {
    				if (!this.conditions[i](detail)) {
    					return false;
    				}
    			}

    			return true;
    		}
    	}

    	// Set up all routes
    	const routesList = [];

    	if (routes instanceof Map) {
    		// If it's a map, iterate on it right away
    		routes.forEach((route, path) => {
    			routesList.push(new RouteItem(path, route));
    		});
    	} else {
    		// We have an object, so iterate on its own properties
    		Object.keys(routes).forEach(path => {
    			routesList.push(new RouteItem(path, routes[path]));
    		});
    	}

    	// Props for the component to render
    	let component = null;

    	let componentParams = null;

    	// Event dispatcher from Svelte
    	const dispatch = createEventDispatcher();

    	// Just like dispatch, but executes on the next iteration of the event loop
    	const dispatchNextTick = (name, detail) => {
    		// Execute this code when the current call stack is complete
    		setTimeout(
    			() => {
    				dispatch(name, detail);
    			},
    			0
    		);
    	};

    	const writable_props = ["routes", "prefix"];

    	Object_1.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1.warn(`<Router> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Router", $$slots, []);

    	function routeEvent_handler(event) {
    		bubble($$self, event);
    	}

    	function routeEvent_handler_1(event) {
    		bubble($$self, event);
    	}

    	$$self.$set = $$props => {
    		if ("routes" in $$props) $$invalidate(2, routes = $$props.routes);
    		if ("prefix" in $$props) $$invalidate(3, prefix = $$props.prefix);
    	};

    	$$self.$capture_state = () => ({
    		readable,
    		derived,
    		wrap,
    		getLocation,
    		loc,
    		location,
    		querystring,
    		push,
    		pop,
    		replace,
    		link,
    		nextTickPromise,
    		createEventDispatcher,
    		regexparam,
    		routes,
    		prefix,
    		RouteItem,
    		routesList,
    		component,
    		componentParams,
    		dispatch,
    		dispatchNextTick,
    		$loc
    	});

    	$$self.$inject_state = $$props => {
    		if ("routes" in $$props) $$invalidate(2, routes = $$props.routes);
    		if ("prefix" in $$props) $$invalidate(3, prefix = $$props.prefix);
    		if ("component" in $$props) $$invalidate(0, component = $$props.component);
    		if ("componentParams" in $$props) $$invalidate(1, componentParams = $$props.componentParams);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*component, $loc*/ 17) {
    			// Handle hash change events
    			// Listen to changes in the $loc store and update the page
    			 {
    				// Find a route matching the location
    				$$invalidate(0, component = null);

    				let i = 0;

    				while (!component && i < routesList.length) {
    					const match = routesList[i].match($loc.location);

    					if (match) {
    						const detail = {
    							component: routesList[i].component,
    							name: routesList[i].component.name,
    							location: $loc.location,
    							querystring: $loc.querystring,
    							userData: routesList[i].userData
    						};

    						// Check if the route can be loaded - if all conditions succeed
    						if (!routesList[i].checkConditions(detail)) {
    							// Trigger an event to notify the user
    							dispatchNextTick("conditionsFailed", detail);

    							break;
    						}

    						$$invalidate(0, component = routesList[i].component);

    						// Set componentParams onloy if we have a match, to avoid a warning similar to `<Component> was created with unknown prop 'params'`
    						// Of course, this assumes that developers always add a "params" prop when they are expecting parameters
    						if (match && typeof match == "object" && Object.keys(match).length) {
    							$$invalidate(1, componentParams = match);
    						} else {
    							$$invalidate(1, componentParams = null);
    						}

    						dispatchNextTick("routeLoaded", detail);
    					}

    					i++;
    				}
    			}
    		}
    	};

    	return [
    		component,
    		componentParams,
    		routes,
    		prefix,
    		$loc,
    		RouteItem,
    		routesList,
    		dispatch,
    		dispatchNextTick,
    		routeEvent_handler,
    		routeEvent_handler_1
    	];
    }

    class Router extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, { routes: 2, prefix: 3 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Router",
    			options,
    			id: create_fragment.name
    		});
    	}

    	get routes() {
    		throw new Error_1("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set routes(value) {
    		throw new Error_1("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get prefix() {
    		throw new Error_1("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set prefix(value) {
    		throw new Error_1("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\front\Home.svelte generated by Svelte v3.21.0 */

    const file = "src\\front\\Home.svelte";

    function create_fragment$1(ctx) {
    	let main;
    	let div;
    	let button0;
    	let i0;
    	let t0;
    	let t1;
    	let button1;
    	let i1;
    	let t2;
    	let t3;
    	let button2;

    	const block = {
    		c: function create() {
    			main = element("main");
    			div = element("div");
    			button0 = element("button");
    			i0 = element("i");
    			t0 = text(" API de coef globales");
    			t1 = space();
    			button1 = element("button");
    			i1 = element("i");
    			t2 = text(" API de las transferencias del mercado de fichajes");
    			t3 = space();
    			button2 = element("button");
    			button2.textContent = "API de goleadores";
    			attr_dev(i0, "class", "fa fa-percent");
    			attr_dev(i0, "aria-hidden", "true");
    			add_location(i0, file, 3, 106, 141);
    			attr_dev(button0, "type", "button");
    			attr_dev(button0, "class", "btn btn-outline-success");
    			attr_dev(button0, "onclick", "window.location.href='#/globalCoefAPI'");
    			add_location(button0, file, 3, 2, 37);
    			attr_dev(i1, "class", "fa fa-money");
    			attr_dev(i1, "aria-hidden", "true");
    			add_location(i1, file, 4, 107, 328);
    			attr_dev(button1, "type", "button");
    			attr_dev(button1, "class", "btn btn-outline-info");
    			attr_dev(button1, "onclick", "window.location.href='#/globaltransfersAPI'");
    			add_location(button1, file, 4, 2, 223);
    			attr_dev(button2, "type", "button");
    			attr_dev(button2, "class", "btn btn-outline-success");
    			attr_dev(button2, "onclick", "window.location.href='#/goalscorersAPI'");
    			add_location(button2, file, 5, 2, 437);
    			attr_dev(div, "class", "div-home");
    			add_location(div, file, 2, 1, 11);
    			add_location(main, file, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, div);
    			append_dev(div, button0);
    			append_dev(button0, i0);
    			append_dev(button0, t0);
    			append_dev(div, t1);
    			append_dev(div, button1);
    			append_dev(button1, i1);
    			append_dev(button1, t2);
    			append_dev(div, t3);
    			append_dev(div, button2);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props) {
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Home> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Home", $$slots, []);
    	return [];
    }

    class Home extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Home",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    function toVal(mix) {
    	var k, y, str='';
    	if (mix) {
    		if (typeof mix === 'object') {
    			if (Array.isArray(mix)) {
    				for (k=0; k < mix.length; k++) {
    					if (mix[k] && (y = toVal(mix[k]))) {
    						str && (str += ' ');
    						str += y;
    					}
    				}
    			} else {
    				for (k in mix) {
    					if (mix[k] && (y = toVal(k))) {
    						str && (str += ' ');
    						str += y;
    					}
    				}
    			}
    		} else if (typeof mix !== 'boolean' && !mix.call) {
    			str && (str += ' ');
    			str += mix;
    		}
    	}
    	return str;
    }

    function clsx () {
    	var i=0, x, str='';
    	while (i < arguments.length) {
    		if (x = toVal(arguments[i++])) {
    			str && (str += ' ');
    			str += x;
    		}
    	}
    	return str;
    }

    function isObject(value) {
      const type = typeof value;
      return value != null && (type == 'object' || type == 'function');
    }

    function getColumnSizeClass(isXs, colWidth, colSize) {
      if (colSize === true || colSize === '') {
        return isXs ? 'col' : `col-${colWidth}`;
      } else if (colSize === 'auto') {
        return isXs ? 'col-auto' : `col-${colWidth}-auto`;
      }

      return isXs ? `col-${colSize}` : `col-${colWidth}-${colSize}`;
    }

    function clean($$props) {
      const rest = {};
      for (const key of Object.keys($$props)) {
        if (key !== "children" && key !== "$$scope" && key !== "$$slots") {
          rest[key] = $$props[key];
        }
      }
      return rest;
    }

    /* node_modules\sveltestrap\src\Table.svelte generated by Svelte v3.21.0 */
    const file$1 = "node_modules\\sveltestrap\\src\\Table.svelte";

    // (38:0) {:else}
    function create_else_block$1(ctx) {
    	let table;
    	let current;
    	const default_slot_template = /*$$slots*/ ctx[13].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[12], null);
    	let table_levels = [/*props*/ ctx[3], { class: /*classes*/ ctx[1] }];
    	let table_data = {};

    	for (let i = 0; i < table_levels.length; i += 1) {
    		table_data = assign(table_data, table_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			table = element("table");
    			if (default_slot) default_slot.c();
    			set_attributes(table, table_data);
    			add_location(table, file$1, 38, 2, 908);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, table, anchor);

    			if (default_slot) {
    				default_slot.m(table, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && dirty & /*$$scope*/ 4096) {
    					default_slot.p(get_slot_context(default_slot_template, ctx, /*$$scope*/ ctx[12], null), get_slot_changes(default_slot_template, /*$$scope*/ ctx[12], dirty, null));
    				}
    			}

    			set_attributes(table, get_spread_update(table_levels, [
    				dirty & /*props*/ 8 && /*props*/ ctx[3],
    				dirty & /*classes*/ 2 && { class: /*classes*/ ctx[1] }
    			]));
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(table);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$1.name,
    		type: "else",
    		source: "(38:0) {:else}",
    		ctx
    	});

    	return block;
    }

    // (32:0) {#if responsive}
    function create_if_block$1(ctx) {
    	let div;
    	let table;
    	let current;
    	const default_slot_template = /*$$slots*/ ctx[13].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[12], null);
    	let table_levels = [/*props*/ ctx[3], { class: /*classes*/ ctx[1] }];
    	let table_data = {};

    	for (let i = 0; i < table_levels.length; i += 1) {
    		table_data = assign(table_data, table_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			table = element("table");
    			if (default_slot) default_slot.c();
    			set_attributes(table, table_data);
    			add_location(table, file$1, 33, 4, 826);
    			attr_dev(div, "class", /*responsiveClassName*/ ctx[2]);
    			add_location(div, file$1, 32, 2, 788);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, table);

    			if (default_slot) {
    				default_slot.m(table, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && dirty & /*$$scope*/ 4096) {
    					default_slot.p(get_slot_context(default_slot_template, ctx, /*$$scope*/ ctx[12], null), get_slot_changes(default_slot_template, /*$$scope*/ ctx[12], dirty, null));
    				}
    			}

    			set_attributes(table, get_spread_update(table_levels, [
    				dirty & /*props*/ 8 && /*props*/ ctx[3],
    				dirty & /*classes*/ 2 && { class: /*classes*/ ctx[1] }
    			]));

    			if (!current || dirty & /*responsiveClassName*/ 4) {
    				attr_dev(div, "class", /*responsiveClassName*/ ctx[2]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(32:0) {#if responsive}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block$1, create_else_block$1];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*responsive*/ ctx[0]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { class: className = "" } = $$props;
    	let { size = "" } = $$props;
    	let { bordered = false } = $$props;
    	let { borderless = false } = $$props;
    	let { striped = false } = $$props;
    	let { dark = false } = $$props;
    	let { hover = false } = $$props;
    	let { responsive = false } = $$props;
    	const props = clean($$props);
    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Table", $$slots, ['default']);

    	$$self.$set = $$new_props => {
    		$$invalidate(11, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    		if ("class" in $$new_props) $$invalidate(4, className = $$new_props.class);
    		if ("size" in $$new_props) $$invalidate(5, size = $$new_props.size);
    		if ("bordered" in $$new_props) $$invalidate(6, bordered = $$new_props.bordered);
    		if ("borderless" in $$new_props) $$invalidate(7, borderless = $$new_props.borderless);
    		if ("striped" in $$new_props) $$invalidate(8, striped = $$new_props.striped);
    		if ("dark" in $$new_props) $$invalidate(9, dark = $$new_props.dark);
    		if ("hover" in $$new_props) $$invalidate(10, hover = $$new_props.hover);
    		if ("responsive" in $$new_props) $$invalidate(0, responsive = $$new_props.responsive);
    		if ("$$scope" in $$new_props) $$invalidate(12, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		clsx,
    		clean,
    		className,
    		size,
    		bordered,
    		borderless,
    		striped,
    		dark,
    		hover,
    		responsive,
    		props,
    		classes,
    		responsiveClassName
    	});

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(11, $$props = assign(assign({}, $$props), $$new_props));
    		if ("className" in $$props) $$invalidate(4, className = $$new_props.className);
    		if ("size" in $$props) $$invalidate(5, size = $$new_props.size);
    		if ("bordered" in $$props) $$invalidate(6, bordered = $$new_props.bordered);
    		if ("borderless" in $$props) $$invalidate(7, borderless = $$new_props.borderless);
    		if ("striped" in $$props) $$invalidate(8, striped = $$new_props.striped);
    		if ("dark" in $$props) $$invalidate(9, dark = $$new_props.dark);
    		if ("hover" in $$props) $$invalidate(10, hover = $$new_props.hover);
    		if ("responsive" in $$props) $$invalidate(0, responsive = $$new_props.responsive);
    		if ("classes" in $$props) $$invalidate(1, classes = $$new_props.classes);
    		if ("responsiveClassName" in $$props) $$invalidate(2, responsiveClassName = $$new_props.responsiveClassName);
    	};

    	let classes;
    	let responsiveClassName;

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*className, size, bordered, borderless, striped, dark, hover*/ 2032) {
    			 $$invalidate(1, classes = clsx(className, "table", size ? "table-" + size : false, bordered ? "table-bordered" : false, borderless ? "table-borderless" : false, striped ? "table-striped" : false, dark ? "table-dark" : false, hover ? "table-hover" : false));
    		}

    		if ($$self.$$.dirty & /*responsive*/ 1) {
    			 $$invalidate(2, responsiveClassName = responsive === true
    			? "table-responsive"
    			: `table-responsive-${responsive}`);
    		}
    	};

    	$$props = exclude_internal_props($$props);

    	return [
    		responsive,
    		classes,
    		responsiveClassName,
    		props,
    		className,
    		size,
    		bordered,
    		borderless,
    		striped,
    		dark,
    		hover,
    		$$props,
    		$$scope,
    		$$slots
    	];
    }

    class Table extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {
    			class: 4,
    			size: 5,
    			bordered: 6,
    			borderless: 7,
    			striped: 8,
    			dark: 9,
    			hover: 10,
    			responsive: 0
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Table",
    			options,
    			id: create_fragment$2.name
    		});
    	}

    	get class() {
    		throw new Error("<Table>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<Table>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get size() {
    		throw new Error("<Table>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<Table>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get bordered() {
    		throw new Error("<Table>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set bordered(value) {
    		throw new Error("<Table>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get borderless() {
    		throw new Error("<Table>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set borderless(value) {
    		throw new Error("<Table>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get striped() {
    		throw new Error("<Table>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set striped(value) {
    		throw new Error("<Table>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get dark() {
    		throw new Error("<Table>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set dark(value) {
    		throw new Error("<Table>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get hover() {
    		throw new Error("<Table>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set hover(value) {
    		throw new Error("<Table>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get responsive() {
    		throw new Error("<Table>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set responsive(value) {
    		throw new Error("<Table>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules\sveltestrap\src\Button.svelte generated by Svelte v3.21.0 */
    const file$2 = "node_modules\\sveltestrap\\src\\Button.svelte";

    // (53:0) {:else}
    function create_else_block_1(ctx) {
    	let button;
    	let current;
    	let dispose;
    	const default_slot_template = /*$$slots*/ ctx[19].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[18], null);
    	const default_slot_or_fallback = default_slot || fallback_block(ctx);

    	let button_levels = [
    		/*props*/ ctx[10],
    		{ id: /*id*/ ctx[4] },
    		{ class: /*classes*/ ctx[8] },
    		{ disabled: /*disabled*/ ctx[2] },
    		{ value: /*value*/ ctx[6] },
    		{
    			"aria-label": /*ariaLabel*/ ctx[7] || /*defaultAriaLabel*/ ctx[9]
    		},
    		{ style: /*style*/ ctx[5] }
    	];

    	let button_data = {};

    	for (let i = 0; i < button_levels.length; i += 1) {
    		button_data = assign(button_data, button_levels[i]);
    	}

    	const block_1 = {
    		c: function create() {
    			button = element("button");
    			if (default_slot_or_fallback) default_slot_or_fallback.c();
    			set_attributes(button, button_data);
    			add_location(button, file$2, 53, 2, 1061);
    		},
    		m: function mount(target, anchor, remount) {
    			insert_dev(target, button, anchor);

    			if (default_slot_or_fallback) {
    				default_slot_or_fallback.m(button, null);
    			}

    			current = true;
    			if (remount) dispose();
    			dispose = listen_dev(button, "click", /*click_handler_1*/ ctx[21], false, false, false);
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && dirty & /*$$scope*/ 262144) {
    					default_slot.p(get_slot_context(default_slot_template, ctx, /*$$scope*/ ctx[18], null), get_slot_changes(default_slot_template, /*$$scope*/ ctx[18], dirty, null));
    				}
    			} else {
    				if (default_slot_or_fallback && default_slot_or_fallback.p && dirty & /*close, children, $$scope*/ 262147) {
    					default_slot_or_fallback.p(ctx, dirty);
    				}
    			}

    			set_attributes(button, get_spread_update(button_levels, [
    				dirty & /*props*/ 1024 && /*props*/ ctx[10],
    				dirty & /*id*/ 16 && { id: /*id*/ ctx[4] },
    				dirty & /*classes*/ 256 && { class: /*classes*/ ctx[8] },
    				dirty & /*disabled*/ 4 && { disabled: /*disabled*/ ctx[2] },
    				dirty & /*value*/ 64 && { value: /*value*/ ctx[6] },
    				dirty & /*ariaLabel, defaultAriaLabel*/ 640 && {
    					"aria-label": /*ariaLabel*/ ctx[7] || /*defaultAriaLabel*/ ctx[9]
    				},
    				dirty & /*style*/ 32 && { style: /*style*/ ctx[5] }
    			]));
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot_or_fallback, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot_or_fallback, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			if (default_slot_or_fallback) default_slot_or_fallback.d(detaching);
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block: block_1,
    		id: create_else_block_1.name,
    		type: "else",
    		source: "(53:0) {:else}",
    		ctx
    	});

    	return block_1;
    }

    // (37:0) {#if href}
    function create_if_block$2(ctx) {
    	let a;
    	let current_block_type_index;
    	let if_block;
    	let current;
    	let dispose;
    	const if_block_creators = [create_if_block_1, create_else_block$2];
    	const if_blocks = [];

    	function select_block_type_1(ctx, dirty) {
    		if (/*children*/ ctx[0]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type_1(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	let a_levels = [
    		/*props*/ ctx[10],
    		{ id: /*id*/ ctx[4] },
    		{ class: /*classes*/ ctx[8] },
    		{ disabled: /*disabled*/ ctx[2] },
    		{ href: /*href*/ ctx[3] },
    		{
    			"aria-label": /*ariaLabel*/ ctx[7] || /*defaultAriaLabel*/ ctx[9]
    		},
    		{ style: /*style*/ ctx[5] }
    	];

    	let a_data = {};

    	for (let i = 0; i < a_levels.length; i += 1) {
    		a_data = assign(a_data, a_levels[i]);
    	}

    	const block_1 = {
    		c: function create() {
    			a = element("a");
    			if_block.c();
    			set_attributes(a, a_data);
    			add_location(a, file$2, 37, 2, 825);
    		},
    		m: function mount(target, anchor, remount) {
    			insert_dev(target, a, anchor);
    			if_blocks[current_block_type_index].m(a, null);
    			current = true;
    			if (remount) dispose();
    			dispose = listen_dev(a, "click", /*click_handler*/ ctx[20], false, false, false);
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type_1(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				}

    				transition_in(if_block, 1);
    				if_block.m(a, null);
    			}

    			set_attributes(a, get_spread_update(a_levels, [
    				dirty & /*props*/ 1024 && /*props*/ ctx[10],
    				dirty & /*id*/ 16 && { id: /*id*/ ctx[4] },
    				dirty & /*classes*/ 256 && { class: /*classes*/ ctx[8] },
    				dirty & /*disabled*/ 4 && { disabled: /*disabled*/ ctx[2] },
    				dirty & /*href*/ 8 && { href: /*href*/ ctx[3] },
    				dirty & /*ariaLabel, defaultAriaLabel*/ 640 && {
    					"aria-label": /*ariaLabel*/ ctx[7] || /*defaultAriaLabel*/ ctx[9]
    				},
    				dirty & /*style*/ 32 && { style: /*style*/ ctx[5] }
    			]));
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    			if_blocks[current_block_type_index].d();
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block: block_1,
    		id: create_if_block$2.name,
    		type: "if",
    		source: "(37:0) {#if href}",
    		ctx
    	});

    	return block_1;
    }

    // (68:6) {:else}
    function create_else_block_2(ctx) {
    	let current;
    	const default_slot_template = /*$$slots*/ ctx[19].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[18], null);

    	const block_1 = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && dirty & /*$$scope*/ 262144) {
    					default_slot.p(get_slot_context(default_slot_template, ctx, /*$$scope*/ ctx[18], null), get_slot_changes(default_slot_template, /*$$scope*/ ctx[18], dirty, null));
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block: block_1,
    		id: create_else_block_2.name,
    		type: "else",
    		source: "(68:6) {:else}",
    		ctx
    	});

    	return block_1;
    }

    // (66:25) 
    function create_if_block_3(ctx) {
    	let t;

    	const block_1 = {
    		c: function create() {
    			t = text(/*children*/ ctx[0]);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*children*/ 1) set_data_dev(t, /*children*/ ctx[0]);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block: block_1,
    		id: create_if_block_3.name,
    		type: "if",
    		source: "(66:25) ",
    		ctx
    	});

    	return block_1;
    }

    // (64:6) {#if close}
    function create_if_block_2(ctx) {
    	let span;

    	const block_1 = {
    		c: function create() {
    			span = element("span");
    			span.textContent = "×";
    			attr_dev(span, "aria-hidden", "true");
    			add_location(span, file$2, 64, 8, 1250);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block: block_1,
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(64:6) {#if close}",
    		ctx
    	});

    	return block_1;
    }

    // (63:10)        
    function fallback_block(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block_2, create_if_block_3, create_else_block_2];
    	const if_blocks = [];

    	function select_block_type_2(ctx, dirty) {
    		if (/*close*/ ctx[1]) return 0;
    		if (/*children*/ ctx[0]) return 1;
    		return 2;
    	}

    	current_block_type_index = select_block_type_2(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block_1 = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type_2(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block: block_1,
    		id: fallback_block.name,
    		type: "fallback",
    		source: "(63:10)        ",
    		ctx
    	});

    	return block_1;
    }

    // (49:4) {:else}
    function create_else_block$2(ctx) {
    	let current;
    	const default_slot_template = /*$$slots*/ ctx[19].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[18], null);

    	const block_1 = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && dirty & /*$$scope*/ 262144) {
    					default_slot.p(get_slot_context(default_slot_template, ctx, /*$$scope*/ ctx[18], null), get_slot_changes(default_slot_template, /*$$scope*/ ctx[18], dirty, null));
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block: block_1,
    		id: create_else_block$2.name,
    		type: "else",
    		source: "(49:4) {:else}",
    		ctx
    	});

    	return block_1;
    }

    // (47:4) {#if children}
    function create_if_block_1(ctx) {
    	let t;

    	const block_1 = {
    		c: function create() {
    			t = text(/*children*/ ctx[0]);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*children*/ 1) set_data_dev(t, /*children*/ ctx[0]);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block: block_1,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(47:4) {#if children}",
    		ctx
    	});

    	return block_1;
    }

    function create_fragment$3(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block$2, create_else_block_1];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*href*/ ctx[3]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block_1 = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block: block_1,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block_1;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { class: className = "" } = $$props;
    	let { active = false } = $$props;
    	let { block = false } = $$props;
    	let { children = undefined } = $$props;
    	let { close = false } = $$props;
    	let { color = "secondary" } = $$props;
    	let { disabled = false } = $$props;
    	let { href = "" } = $$props;
    	let { id = "" } = $$props;
    	let { outline = false } = $$props;
    	let { size = "" } = $$props;
    	let { style = "" } = $$props;
    	let { value = "" } = $$props;
    	const props = clean($$props);
    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Button", $$slots, ['default']);

    	function click_handler(event) {
    		bubble($$self, event);
    	}

    	function click_handler_1(event) {
    		bubble($$self, event);
    	}

    	$$self.$set = $$new_props => {
    		$$invalidate(17, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    		if ("class" in $$new_props) $$invalidate(11, className = $$new_props.class);
    		if ("active" in $$new_props) $$invalidate(12, active = $$new_props.active);
    		if ("block" in $$new_props) $$invalidate(13, block = $$new_props.block);
    		if ("children" in $$new_props) $$invalidate(0, children = $$new_props.children);
    		if ("close" in $$new_props) $$invalidate(1, close = $$new_props.close);
    		if ("color" in $$new_props) $$invalidate(14, color = $$new_props.color);
    		if ("disabled" in $$new_props) $$invalidate(2, disabled = $$new_props.disabled);
    		if ("href" in $$new_props) $$invalidate(3, href = $$new_props.href);
    		if ("id" in $$new_props) $$invalidate(4, id = $$new_props.id);
    		if ("outline" in $$new_props) $$invalidate(15, outline = $$new_props.outline);
    		if ("size" in $$new_props) $$invalidate(16, size = $$new_props.size);
    		if ("style" in $$new_props) $$invalidate(5, style = $$new_props.style);
    		if ("value" in $$new_props) $$invalidate(6, value = $$new_props.value);
    		if ("$$scope" in $$new_props) $$invalidate(18, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		clsx,
    		clean,
    		className,
    		active,
    		block,
    		children,
    		close,
    		color,
    		disabled,
    		href,
    		id,
    		outline,
    		size,
    		style,
    		value,
    		props,
    		ariaLabel,
    		classes,
    		defaultAriaLabel
    	});

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(17, $$props = assign(assign({}, $$props), $$new_props));
    		if ("className" in $$props) $$invalidate(11, className = $$new_props.className);
    		if ("active" in $$props) $$invalidate(12, active = $$new_props.active);
    		if ("block" in $$props) $$invalidate(13, block = $$new_props.block);
    		if ("children" in $$props) $$invalidate(0, children = $$new_props.children);
    		if ("close" in $$props) $$invalidate(1, close = $$new_props.close);
    		if ("color" in $$props) $$invalidate(14, color = $$new_props.color);
    		if ("disabled" in $$props) $$invalidate(2, disabled = $$new_props.disabled);
    		if ("href" in $$props) $$invalidate(3, href = $$new_props.href);
    		if ("id" in $$props) $$invalidate(4, id = $$new_props.id);
    		if ("outline" in $$props) $$invalidate(15, outline = $$new_props.outline);
    		if ("size" in $$props) $$invalidate(16, size = $$new_props.size);
    		if ("style" in $$props) $$invalidate(5, style = $$new_props.style);
    		if ("value" in $$props) $$invalidate(6, value = $$new_props.value);
    		if ("ariaLabel" in $$props) $$invalidate(7, ariaLabel = $$new_props.ariaLabel);
    		if ("classes" in $$props) $$invalidate(8, classes = $$new_props.classes);
    		if ("defaultAriaLabel" in $$props) $$invalidate(9, defaultAriaLabel = $$new_props.defaultAriaLabel);
    	};

    	let ariaLabel;
    	let classes;
    	let defaultAriaLabel;

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		 $$invalidate(7, ariaLabel = $$props["aria-label"]);

    		if ($$self.$$.dirty & /*className, close, outline, color, size, block, active*/ 129026) {
    			 $$invalidate(8, classes = clsx(className, { close }, close || "btn", close || `btn${outline ? "-outline" : ""}-${color}`, size ? `btn-${size}` : false, block ? "btn-block" : false, { active }));
    		}

    		if ($$self.$$.dirty & /*close*/ 2) {
    			 $$invalidate(9, defaultAriaLabel = close ? "Close" : null);
    		}
    	};

    	$$props = exclude_internal_props($$props);

    	return [
    		children,
    		close,
    		disabled,
    		href,
    		id,
    		style,
    		value,
    		ariaLabel,
    		classes,
    		defaultAriaLabel,
    		props,
    		className,
    		active,
    		block,
    		color,
    		outline,
    		size,
    		$$props,
    		$$scope,
    		$$slots,
    		click_handler,
    		click_handler_1
    	];
    }

    class Button extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {
    			class: 11,
    			active: 12,
    			block: 13,
    			children: 0,
    			close: 1,
    			color: 14,
    			disabled: 2,
    			href: 3,
    			id: 4,
    			outline: 15,
    			size: 16,
    			style: 5,
    			value: 6
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Button",
    			options,
    			id: create_fragment$3.name
    		});
    	}

    	get class() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get active() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set active(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get block() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set block(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get children() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set children(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get close() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set close(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get color() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get disabled() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set disabled(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get href() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set href(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get id() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set id(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get outline() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set outline(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get size() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get style() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set style(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get value() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set value(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules\sveltestrap\src\Input.svelte generated by Svelte v3.21.0 */

    const { console: console_1$1 } = globals;
    const file$3 = "node_modules\\sveltestrap\\src\\Input.svelte";

    // (391:39) 
    function create_if_block_17(ctx) {
    	let select;
    	let current;
    	let dispose;
    	const default_slot_template = /*$$slots*/ ctx[26].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[25], null);

    	let select_levels = [
    		/*props*/ ctx[12],
    		{ id: /*id*/ ctx[6] },
    		{ multiple: true },
    		{ class: /*classes*/ ctx[10] },
    		{ name: /*name*/ ctx[7] },
    		{ disabled: /*disabled*/ ctx[9] }
    	];

    	let select_data = {};

    	for (let i = 0; i < select_levels.length; i += 1) {
    		select_data = assign(select_data, select_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			select = element("select");
    			if (default_slot) default_slot.c();
    			set_attributes(select, select_data);
    			if (/*value*/ ctx[1] === void 0) add_render_callback(() => /*select_change_handler_1*/ ctx[161].call(select));
    			add_location(select, file$3, 391, 2, 7495);
    		},
    		m: function mount(target, anchor, remount) {
    			insert_dev(target, select, anchor);

    			if (default_slot) {
    				default_slot.m(select, null);
    			}

    			select_options(select, /*value*/ ctx[1]);
    			current = true;
    			if (remount) run_all(dispose);

    			dispose = [
    				listen_dev(select, "blur", /*blur_handler_17*/ ctx[141], false, false, false),
    				listen_dev(select, "focus", /*focus_handler_17*/ ctx[142], false, false, false),
    				listen_dev(select, "change", /*change_handler_16*/ ctx[143], false, false, false),
    				listen_dev(select, "input", /*input_handler_16*/ ctx[144], false, false, false),
    				listen_dev(select, "change", /*select_change_handler_1*/ ctx[161])
    			];
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && dirty[0] & /*$$scope*/ 33554432) {
    					default_slot.p(get_slot_context(default_slot_template, ctx, /*$$scope*/ ctx[25], null), get_slot_changes(default_slot_template, /*$$scope*/ ctx[25], dirty, null));
    				}
    			}

    			set_attributes(select, get_spread_update(select_levels, [
    				dirty[0] & /*props*/ 4096 && /*props*/ ctx[12],
    				dirty[0] & /*id*/ 64 && { id: /*id*/ ctx[6] },
    				{ multiple: true },
    				dirty[0] & /*classes*/ 1024 && { class: /*classes*/ ctx[10] },
    				dirty[0] & /*name*/ 128 && { name: /*name*/ ctx[7] },
    				dirty[0] & /*disabled*/ 512 && { disabled: /*disabled*/ ctx[9] }
    			]));

    			if (dirty[0] & /*value*/ 2) {
    				select_options(select, /*value*/ ctx[1]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(select);
    			if (default_slot) default_slot.d(detaching);
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_17.name,
    		type: "if",
    		source: "(391:39) ",
    		ctx
    	});

    	return block;
    }

    // (376:40) 
    function create_if_block_16(ctx) {
    	let select;
    	let current;
    	let dispose;
    	const default_slot_template = /*$$slots*/ ctx[26].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[25], null);

    	let select_levels = [
    		/*props*/ ctx[12],
    		{ id: /*id*/ ctx[6] },
    		{ class: /*classes*/ ctx[10] },
    		{ name: /*name*/ ctx[7] },
    		{ disabled: /*disabled*/ ctx[9] }
    	];

    	let select_data = {};

    	for (let i = 0; i < select_levels.length; i += 1) {
    		select_data = assign(select_data, select_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			select = element("select");
    			if (default_slot) default_slot.c();
    			set_attributes(select, select_data);
    			if (/*value*/ ctx[1] === void 0) add_render_callback(() => /*select_change_handler*/ ctx[160].call(select));
    			add_location(select, file$3, 376, 2, 7281);
    		},
    		m: function mount(target, anchor, remount) {
    			insert_dev(target, select, anchor);

    			if (default_slot) {
    				default_slot.m(select, null);
    			}

    			select_option(select, /*value*/ ctx[1]);
    			current = true;
    			if (remount) run_all(dispose);

    			dispose = [
    				listen_dev(select, "blur", /*blur_handler_16*/ ctx[137], false, false, false),
    				listen_dev(select, "focus", /*focus_handler_16*/ ctx[138], false, false, false),
    				listen_dev(select, "change", /*change_handler_15*/ ctx[139], false, false, false),
    				listen_dev(select, "input", /*input_handler_15*/ ctx[140], false, false, false),
    				listen_dev(select, "change", /*select_change_handler*/ ctx[160])
    			];
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && dirty[0] & /*$$scope*/ 33554432) {
    					default_slot.p(get_slot_context(default_slot_template, ctx, /*$$scope*/ ctx[25], null), get_slot_changes(default_slot_template, /*$$scope*/ ctx[25], dirty, null));
    				}
    			}

    			set_attributes(select, get_spread_update(select_levels, [
    				dirty[0] & /*props*/ 4096 && /*props*/ ctx[12],
    				dirty[0] & /*id*/ 64 && { id: /*id*/ ctx[6] },
    				dirty[0] & /*classes*/ 1024 && { class: /*classes*/ ctx[10] },
    				dirty[0] & /*name*/ 128 && { name: /*name*/ ctx[7] },
    				dirty[0] & /*disabled*/ 512 && { disabled: /*disabled*/ ctx[9] }
    			]));

    			if (dirty[0] & /*value*/ 2) {
    				select_option(select, /*value*/ ctx[1]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(select);
    			if (default_slot) default_slot.d(detaching);
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_16.name,
    		type: "if",
    		source: "(376:40) ",
    		ctx
    	});

    	return block;
    }

    // (360:29) 
    function create_if_block_15(ctx) {
    	let textarea;
    	let dispose;

    	let textarea_levels = [
    		/*props*/ ctx[12],
    		{ id: /*id*/ ctx[6] },
    		{ class: /*classes*/ ctx[10] },
    		{ name: /*name*/ ctx[7] },
    		{ disabled: /*disabled*/ ctx[9] }
    	];

    	let textarea_data = {};

    	for (let i = 0; i < textarea_levels.length; i += 1) {
    		textarea_data = assign(textarea_data, textarea_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			textarea = element("textarea");
    			set_attributes(textarea, textarea_data);
    			add_location(textarea, file$3, 360, 2, 7043);
    		},
    		m: function mount(target, anchor, remount) {
    			insert_dev(target, textarea, anchor);
    			set_input_value(textarea, /*value*/ ctx[1]);
    			if (remount) run_all(dispose);

    			dispose = [
    				listen_dev(textarea, "blur", /*blur_handler_15*/ ctx[130], false, false, false),
    				listen_dev(textarea, "focus", /*focus_handler_15*/ ctx[131], false, false, false),
    				listen_dev(textarea, "keydown", /*keydown_handler_15*/ ctx[132], false, false, false),
    				listen_dev(textarea, "keypress", /*keypress_handler_15*/ ctx[133], false, false, false),
    				listen_dev(textarea, "keyup", /*keyup_handler_15*/ ctx[134], false, false, false),
    				listen_dev(textarea, "change", /*change_handler_14*/ ctx[135], false, false, false),
    				listen_dev(textarea, "input", /*input_handler_14*/ ctx[136], false, false, false),
    				listen_dev(textarea, "input", /*textarea_input_handler*/ ctx[159])
    			];
    		},
    		p: function update(ctx, dirty) {
    			set_attributes(textarea, get_spread_update(textarea_levels, [
    				dirty[0] & /*props*/ 4096 && /*props*/ ctx[12],
    				dirty[0] & /*id*/ 64 && { id: /*id*/ ctx[6] },
    				dirty[0] & /*classes*/ 1024 && { class: /*classes*/ ctx[10] },
    				dirty[0] & /*name*/ 128 && { name: /*name*/ ctx[7] },
    				dirty[0] & /*disabled*/ 512 && { disabled: /*disabled*/ ctx[9] }
    			]));

    			if (dirty[0] & /*value*/ 2) {
    				set_input_value(textarea, /*value*/ ctx[1]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(textarea);
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_15.name,
    		type: "if",
    		source: "(360:29) ",
    		ctx
    	});

    	return block;
    }

    // (86:0) {#if tag === 'input'}
    function create_if_block$3(ctx) {
    	let if_block_anchor;

    	function select_block_type_1(ctx, dirty) {
    		if (/*type*/ ctx[3] === "text") return create_if_block_1$1;
    		if (/*type*/ ctx[3] === "password") return create_if_block_2$1;
    		if (/*type*/ ctx[3] === "email") return create_if_block_3$1;
    		if (/*type*/ ctx[3] === "file") return create_if_block_4;
    		if (/*type*/ ctx[3] === "checkbox") return create_if_block_5;
    		if (/*type*/ ctx[3] === "radio") return create_if_block_6;
    		if (/*type*/ ctx[3] === "url") return create_if_block_7;
    		if (/*type*/ ctx[3] === "number") return create_if_block_8;
    		if (/*type*/ ctx[3] === "date") return create_if_block_9;
    		if (/*type*/ ctx[3] === "time") return create_if_block_10;
    		if (/*type*/ ctx[3] === "datetime") return create_if_block_11;
    		if (/*type*/ ctx[3] === "color") return create_if_block_12;
    		if (/*type*/ ctx[3] === "range") return create_if_block_13;
    		if (/*type*/ ctx[3] === "search") return create_if_block_14;
    		return create_else_block$3;
    	}

    	let current_block_type = select_block_type_1(ctx);
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (current_block_type === (current_block_type = select_block_type_1(ctx)) && if_block) {
    				if_block.p(ctx, dirty);
    			} else {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$3.name,
    		type: "if",
    		source: "(86:0) {#if tag === 'input'}",
    		ctx
    	});

    	return block;
    }

    // (340:2) {:else}
    function create_else_block$3(ctx) {
    	let input;
    	let dispose;

    	let input_levels = [
    		/*props*/ ctx[12],
    		{ id: /*id*/ ctx[6] },
    		{ type: /*type*/ ctx[3] },
    		{ readOnly: /*readonly*/ ctx[4] },
    		{ class: /*classes*/ ctx[10] },
    		{ name: /*name*/ ctx[7] },
    		{ disabled: /*disabled*/ ctx[9] },
    		{ placeholder: /*placeholder*/ ctx[8] },
    		{ value: /*value*/ ctx[1] }
    	];

    	let input_data = {};

    	for (let i = 0; i < input_levels.length; i += 1) {
    		input_data = assign(input_data, input_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			input = element("input");
    			set_attributes(input, input_data);
    			add_location(input, file$3, 340, 4, 6710);
    		},
    		m: function mount(target, anchor, remount) {
    			insert_dev(target, input, anchor);
    			if (remount) run_all(dispose);

    			dispose = [
    				listen_dev(input, "blur", /*blur_handler_14*/ ctx[125], false, false, false),
    				listen_dev(input, "focus", /*focus_handler_14*/ ctx[126], false, false, false),
    				listen_dev(input, "keydown", /*keydown_handler_14*/ ctx[127], false, false, false),
    				listen_dev(input, "keypress", /*keypress_handler_14*/ ctx[128], false, false, false),
    				listen_dev(input, "keyup", /*keyup_handler_14*/ ctx[129], false, false, false),
    				listen_dev(input, "input", /*handleInput*/ ctx[13], false, false, false),
    				listen_dev(input, "change", /*handleInput*/ ctx[13], false, false, false)
    			];
    		},
    		p: function update(ctx, dirty) {
    			set_attributes(input, get_spread_update(input_levels, [
    				dirty[0] & /*props*/ 4096 && /*props*/ ctx[12],
    				dirty[0] & /*id*/ 64 && { id: /*id*/ ctx[6] },
    				dirty[0] & /*type*/ 8 && { type: /*type*/ ctx[3] },
    				dirty[0] & /*readonly*/ 16 && { readOnly: /*readonly*/ ctx[4] },
    				dirty[0] & /*classes*/ 1024 && { class: /*classes*/ ctx[10] },
    				dirty[0] & /*name*/ 128 && { name: /*name*/ ctx[7] },
    				dirty[0] & /*disabled*/ 512 && { disabled: /*disabled*/ ctx[9] },
    				dirty[0] & /*placeholder*/ 256 && { placeholder: /*placeholder*/ ctx[8] },
    				dirty[0] & /*value*/ 2 && { value: /*value*/ ctx[1] }
    			]));
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input);
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$3.name,
    		type: "else",
    		source: "(340:2) {:else}",
    		ctx
    	});

    	return block;
    }

    // (322:30) 
    function create_if_block_14(ctx) {
    	let input;
    	let dispose;

    	let input_levels = [
    		/*props*/ ctx[12],
    		{ id: /*id*/ ctx[6] },
    		{ type: "search" },
    		{ readOnly: /*readonly*/ ctx[4] },
    		{ class: /*classes*/ ctx[10] },
    		{ name: /*name*/ ctx[7] },
    		{ disabled: /*disabled*/ ctx[9] },
    		{ placeholder: /*placeholder*/ ctx[8] }
    	];

    	let input_data = {};

    	for (let i = 0; i < input_levels.length; i += 1) {
    		input_data = assign(input_data, input_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			input = element("input");
    			set_attributes(input, input_data);
    			add_location(input, file$3, 322, 4, 6422);
    		},
    		m: function mount(target, anchor, remount) {
    			insert_dev(target, input, anchor);
    			set_input_value(input, /*value*/ ctx[1]);
    			if (remount) run_all(dispose);

    			dispose = [
    				listen_dev(input, "blur", /*blur_handler_13*/ ctx[118], false, false, false),
    				listen_dev(input, "focus", /*focus_handler_13*/ ctx[119], false, false, false),
    				listen_dev(input, "keydown", /*keydown_handler_13*/ ctx[120], false, false, false),
    				listen_dev(input, "keypress", /*keypress_handler_13*/ ctx[121], false, false, false),
    				listen_dev(input, "keyup", /*keyup_handler_13*/ ctx[122], false, false, false),
    				listen_dev(input, "change", /*change_handler_13*/ ctx[123], false, false, false),
    				listen_dev(input, "input", /*input_handler_13*/ ctx[124], false, false, false),
    				listen_dev(input, "input", /*input_input_handler_9*/ ctx[158])
    			];
    		},
    		p: function update(ctx, dirty) {
    			set_attributes(input, get_spread_update(input_levels, [
    				dirty[0] & /*props*/ 4096 && /*props*/ ctx[12],
    				dirty[0] & /*id*/ 64 && { id: /*id*/ ctx[6] },
    				{ type: "search" },
    				dirty[0] & /*readonly*/ 16 && { readOnly: /*readonly*/ ctx[4] },
    				dirty[0] & /*classes*/ 1024 && { class: /*classes*/ ctx[10] },
    				dirty[0] & /*name*/ 128 && { name: /*name*/ ctx[7] },
    				dirty[0] & /*disabled*/ 512 && { disabled: /*disabled*/ ctx[9] },
    				dirty[0] & /*placeholder*/ 256 && { placeholder: /*placeholder*/ ctx[8] }
    			]));

    			if (dirty[0] & /*value*/ 2) {
    				set_input_value(input, /*value*/ ctx[1]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input);
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_14.name,
    		type: "if",
    		source: "(322:30) ",
    		ctx
    	});

    	return block;
    }

    // (304:29) 
    function create_if_block_13(ctx) {
    	let input;
    	let dispose;

    	let input_levels = [
    		/*props*/ ctx[12],
    		{ id: /*id*/ ctx[6] },
    		{ type: "range" },
    		{ readOnly: /*readonly*/ ctx[4] },
    		{ class: /*classes*/ ctx[10] },
    		{ name: /*name*/ ctx[7] },
    		{ disabled: /*disabled*/ ctx[9] },
    		{ placeholder: /*placeholder*/ ctx[8] }
    	];

    	let input_data = {};

    	for (let i = 0; i < input_levels.length; i += 1) {
    		input_data = assign(input_data, input_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			input = element("input");
    			set_attributes(input, input_data);
    			add_location(input, file$3, 304, 4, 6114);
    		},
    		m: function mount(target, anchor, remount) {
    			insert_dev(target, input, anchor);
    			set_input_value(input, /*value*/ ctx[1]);
    			if (remount) run_all(dispose);

    			dispose = [
    				listen_dev(input, "blur", /*blur_handler_12*/ ctx[111], false, false, false),
    				listen_dev(input, "focus", /*focus_handler_12*/ ctx[112], false, false, false),
    				listen_dev(input, "keydown", /*keydown_handler_12*/ ctx[113], false, false, false),
    				listen_dev(input, "keypress", /*keypress_handler_12*/ ctx[114], false, false, false),
    				listen_dev(input, "keyup", /*keyup_handler_12*/ ctx[115], false, false, false),
    				listen_dev(input, "change", /*change_handler_12*/ ctx[116], false, false, false),
    				listen_dev(input, "input", /*input_handler_12*/ ctx[117], false, false, false),
    				listen_dev(input, "change", /*input_change_input_handler*/ ctx[157]),
    				listen_dev(input, "input", /*input_change_input_handler*/ ctx[157])
    			];
    		},
    		p: function update(ctx, dirty) {
    			set_attributes(input, get_spread_update(input_levels, [
    				dirty[0] & /*props*/ 4096 && /*props*/ ctx[12],
    				dirty[0] & /*id*/ 64 && { id: /*id*/ ctx[6] },
    				{ type: "range" },
    				dirty[0] & /*readonly*/ 16 && { readOnly: /*readonly*/ ctx[4] },
    				dirty[0] & /*classes*/ 1024 && { class: /*classes*/ ctx[10] },
    				dirty[0] & /*name*/ 128 && { name: /*name*/ ctx[7] },
    				dirty[0] & /*disabled*/ 512 && { disabled: /*disabled*/ ctx[9] },
    				dirty[0] & /*placeholder*/ 256 && { placeholder: /*placeholder*/ ctx[8] }
    			]));

    			if (dirty[0] & /*value*/ 2) {
    				set_input_value(input, /*value*/ ctx[1]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input);
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_13.name,
    		type: "if",
    		source: "(304:29) ",
    		ctx
    	});

    	return block;
    }

    // (286:29) 
    function create_if_block_12(ctx) {
    	let input;
    	let dispose;

    	let input_levels = [
    		/*props*/ ctx[12],
    		{ id: /*id*/ ctx[6] },
    		{ type: "color" },
    		{ readOnly: /*readonly*/ ctx[4] },
    		{ class: /*classes*/ ctx[10] },
    		{ name: /*name*/ ctx[7] },
    		{ disabled: /*disabled*/ ctx[9] },
    		{ placeholder: /*placeholder*/ ctx[8] }
    	];

    	let input_data = {};

    	for (let i = 0; i < input_levels.length; i += 1) {
    		input_data = assign(input_data, input_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			input = element("input");
    			set_attributes(input, input_data);
    			add_location(input, file$3, 286, 4, 5807);
    		},
    		m: function mount(target, anchor, remount) {
    			insert_dev(target, input, anchor);
    			set_input_value(input, /*value*/ ctx[1]);
    			if (remount) run_all(dispose);

    			dispose = [
    				listen_dev(input, "blur", /*blur_handler_11*/ ctx[104], false, false, false),
    				listen_dev(input, "focus", /*focus_handler_11*/ ctx[105], false, false, false),
    				listen_dev(input, "keydown", /*keydown_handler_11*/ ctx[106], false, false, false),
    				listen_dev(input, "keypress", /*keypress_handler_11*/ ctx[107], false, false, false),
    				listen_dev(input, "keyup", /*keyup_handler_11*/ ctx[108], false, false, false),
    				listen_dev(input, "change", /*change_handler_11*/ ctx[109], false, false, false),
    				listen_dev(input, "input", /*input_handler_11*/ ctx[110], false, false, false),
    				listen_dev(input, "input", /*input_input_handler_8*/ ctx[156])
    			];
    		},
    		p: function update(ctx, dirty) {
    			set_attributes(input, get_spread_update(input_levels, [
    				dirty[0] & /*props*/ 4096 && /*props*/ ctx[12],
    				dirty[0] & /*id*/ 64 && { id: /*id*/ ctx[6] },
    				{ type: "color" },
    				dirty[0] & /*readonly*/ 16 && { readOnly: /*readonly*/ ctx[4] },
    				dirty[0] & /*classes*/ 1024 && { class: /*classes*/ ctx[10] },
    				dirty[0] & /*name*/ 128 && { name: /*name*/ ctx[7] },
    				dirty[0] & /*disabled*/ 512 && { disabled: /*disabled*/ ctx[9] },
    				dirty[0] & /*placeholder*/ 256 && { placeholder: /*placeholder*/ ctx[8] }
    			]));

    			if (dirty[0] & /*value*/ 2) {
    				set_input_value(input, /*value*/ ctx[1]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input);
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_12.name,
    		type: "if",
    		source: "(286:29) ",
    		ctx
    	});

    	return block;
    }

    // (268:32) 
    function create_if_block_11(ctx) {
    	let input;
    	let dispose;

    	let input_levels = [
    		/*props*/ ctx[12],
    		{ id: /*id*/ ctx[6] },
    		{ type: "datetime" },
    		{ readOnly: /*readonly*/ ctx[4] },
    		{ class: /*classes*/ ctx[10] },
    		{ name: /*name*/ ctx[7] },
    		{ disabled: /*disabled*/ ctx[9] },
    		{ placeholder: /*placeholder*/ ctx[8] }
    	];

    	let input_data = {};

    	for (let i = 0; i < input_levels.length; i += 1) {
    		input_data = assign(input_data, input_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			input = element("input");
    			set_attributes(input, input_data);
    			add_location(input, file$3, 268, 4, 5497);
    		},
    		m: function mount(target, anchor, remount) {
    			insert_dev(target, input, anchor);
    			set_input_value(input, /*value*/ ctx[1]);
    			if (remount) run_all(dispose);

    			dispose = [
    				listen_dev(input, "blur", /*blur_handler_10*/ ctx[97], false, false, false),
    				listen_dev(input, "focus", /*focus_handler_10*/ ctx[98], false, false, false),
    				listen_dev(input, "keydown", /*keydown_handler_10*/ ctx[99], false, false, false),
    				listen_dev(input, "keypress", /*keypress_handler_10*/ ctx[100], false, false, false),
    				listen_dev(input, "keyup", /*keyup_handler_10*/ ctx[101], false, false, false),
    				listen_dev(input, "change", /*change_handler_10*/ ctx[102], false, false, false),
    				listen_dev(input, "input", /*input_handler_10*/ ctx[103], false, false, false),
    				listen_dev(input, "input", /*input_input_handler_7*/ ctx[155])
    			];
    		},
    		p: function update(ctx, dirty) {
    			set_attributes(input, get_spread_update(input_levels, [
    				dirty[0] & /*props*/ 4096 && /*props*/ ctx[12],
    				dirty[0] & /*id*/ 64 && { id: /*id*/ ctx[6] },
    				{ type: "datetime" },
    				dirty[0] & /*readonly*/ 16 && { readOnly: /*readonly*/ ctx[4] },
    				dirty[0] & /*classes*/ 1024 && { class: /*classes*/ ctx[10] },
    				dirty[0] & /*name*/ 128 && { name: /*name*/ ctx[7] },
    				dirty[0] & /*disabled*/ 512 && { disabled: /*disabled*/ ctx[9] },
    				dirty[0] & /*placeholder*/ 256 && { placeholder: /*placeholder*/ ctx[8] }
    			]));

    			if (dirty[0] & /*value*/ 2) {
    				set_input_value(input, /*value*/ ctx[1]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input);
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_11.name,
    		type: "if",
    		source: "(268:32) ",
    		ctx
    	});

    	return block;
    }

    // (250:28) 
    function create_if_block_10(ctx) {
    	let input;
    	let dispose;

    	let input_levels = [
    		/*props*/ ctx[12],
    		{ id: /*id*/ ctx[6] },
    		{ type: "time" },
    		{ readOnly: /*readonly*/ ctx[4] },
    		{ class: /*classes*/ ctx[10] },
    		{ name: /*name*/ ctx[7] },
    		{ disabled: /*disabled*/ ctx[9] },
    		{ placeholder: /*placeholder*/ ctx[8] }
    	];

    	let input_data = {};

    	for (let i = 0; i < input_levels.length; i += 1) {
    		input_data = assign(input_data, input_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			input = element("input");
    			set_attributes(input, input_data);
    			add_location(input, file$3, 250, 4, 5188);
    		},
    		m: function mount(target, anchor, remount) {
    			insert_dev(target, input, anchor);
    			set_input_value(input, /*value*/ ctx[1]);
    			if (remount) run_all(dispose);

    			dispose = [
    				listen_dev(input, "blur", /*blur_handler_9*/ ctx[90], false, false, false),
    				listen_dev(input, "focus", /*focus_handler_9*/ ctx[91], false, false, false),
    				listen_dev(input, "keydown", /*keydown_handler_9*/ ctx[92], false, false, false),
    				listen_dev(input, "keypress", /*keypress_handler_9*/ ctx[93], false, false, false),
    				listen_dev(input, "keyup", /*keyup_handler_9*/ ctx[94], false, false, false),
    				listen_dev(input, "change", /*change_handler_9*/ ctx[95], false, false, false),
    				listen_dev(input, "input", /*input_handler_9*/ ctx[96], false, false, false),
    				listen_dev(input, "input", /*input_input_handler_6*/ ctx[154])
    			];
    		},
    		p: function update(ctx, dirty) {
    			set_attributes(input, get_spread_update(input_levels, [
    				dirty[0] & /*props*/ 4096 && /*props*/ ctx[12],
    				dirty[0] & /*id*/ 64 && { id: /*id*/ ctx[6] },
    				{ type: "time" },
    				dirty[0] & /*readonly*/ 16 && { readOnly: /*readonly*/ ctx[4] },
    				dirty[0] & /*classes*/ 1024 && { class: /*classes*/ ctx[10] },
    				dirty[0] & /*name*/ 128 && { name: /*name*/ ctx[7] },
    				dirty[0] & /*disabled*/ 512 && { disabled: /*disabled*/ ctx[9] },
    				dirty[0] & /*placeholder*/ 256 && { placeholder: /*placeholder*/ ctx[8] }
    			]));

    			if (dirty[0] & /*value*/ 2) {
    				set_input_value(input, /*value*/ ctx[1]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input);
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_10.name,
    		type: "if",
    		source: "(250:28) ",
    		ctx
    	});

    	return block;
    }

    // (232:28) 
    function create_if_block_9(ctx) {
    	let input;
    	let dispose;

    	let input_levels = [
    		/*props*/ ctx[12],
    		{ id: /*id*/ ctx[6] },
    		{ type: "date" },
    		{ readOnly: /*readonly*/ ctx[4] },
    		{ class: /*classes*/ ctx[10] },
    		{ name: /*name*/ ctx[7] },
    		{ disabled: /*disabled*/ ctx[9] },
    		{ placeholder: /*placeholder*/ ctx[8] }
    	];

    	let input_data = {};

    	for (let i = 0; i < input_levels.length; i += 1) {
    		input_data = assign(input_data, input_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			input = element("input");
    			set_attributes(input, input_data);
    			add_location(input, file$3, 232, 4, 4883);
    		},
    		m: function mount(target, anchor, remount) {
    			insert_dev(target, input, anchor);
    			set_input_value(input, /*value*/ ctx[1]);
    			if (remount) run_all(dispose);

    			dispose = [
    				listen_dev(input, "blur", /*blur_handler_8*/ ctx[83], false, false, false),
    				listen_dev(input, "focus", /*focus_handler_8*/ ctx[84], false, false, false),
    				listen_dev(input, "keydown", /*keydown_handler_8*/ ctx[85], false, false, false),
    				listen_dev(input, "keypress", /*keypress_handler_8*/ ctx[86], false, false, false),
    				listen_dev(input, "keyup", /*keyup_handler_8*/ ctx[87], false, false, false),
    				listen_dev(input, "change", /*change_handler_8*/ ctx[88], false, false, false),
    				listen_dev(input, "input", /*input_handler_8*/ ctx[89], false, false, false),
    				listen_dev(input, "input", /*input_input_handler_5*/ ctx[153])
    			];
    		},
    		p: function update(ctx, dirty) {
    			set_attributes(input, get_spread_update(input_levels, [
    				dirty[0] & /*props*/ 4096 && /*props*/ ctx[12],
    				dirty[0] & /*id*/ 64 && { id: /*id*/ ctx[6] },
    				{ type: "date" },
    				dirty[0] & /*readonly*/ 16 && { readOnly: /*readonly*/ ctx[4] },
    				dirty[0] & /*classes*/ 1024 && { class: /*classes*/ ctx[10] },
    				dirty[0] & /*name*/ 128 && { name: /*name*/ ctx[7] },
    				dirty[0] & /*disabled*/ 512 && { disabled: /*disabled*/ ctx[9] },
    				dirty[0] & /*placeholder*/ 256 && { placeholder: /*placeholder*/ ctx[8] }
    			]));

    			if (dirty[0] & /*value*/ 2) {
    				set_input_value(input, /*value*/ ctx[1]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input);
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_9.name,
    		type: "if",
    		source: "(232:28) ",
    		ctx
    	});

    	return block;
    }

    // (214:30) 
    function create_if_block_8(ctx) {
    	let input;
    	let dispose;

    	let input_levels = [
    		/*props*/ ctx[12],
    		{ id: /*id*/ ctx[6] },
    		{ type: "number" },
    		{ readOnly: /*readonly*/ ctx[4] },
    		{ class: /*classes*/ ctx[10] },
    		{ name: /*name*/ ctx[7] },
    		{ disabled: /*disabled*/ ctx[9] },
    		{ placeholder: /*placeholder*/ ctx[8] }
    	];

    	let input_data = {};

    	for (let i = 0; i < input_levels.length; i += 1) {
    		input_data = assign(input_data, input_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			input = element("input");
    			set_attributes(input, input_data);
    			add_location(input, file$3, 214, 4, 4576);
    		},
    		m: function mount(target, anchor, remount) {
    			insert_dev(target, input, anchor);
    			set_input_value(input, /*value*/ ctx[1]);
    			if (remount) run_all(dispose);

    			dispose = [
    				listen_dev(input, "blur", /*blur_handler_7*/ ctx[76], false, false, false),
    				listen_dev(input, "focus", /*focus_handler_7*/ ctx[77], false, false, false),
    				listen_dev(input, "keydown", /*keydown_handler_7*/ ctx[78], false, false, false),
    				listen_dev(input, "keypress", /*keypress_handler_7*/ ctx[79], false, false, false),
    				listen_dev(input, "keyup", /*keyup_handler_7*/ ctx[80], false, false, false),
    				listen_dev(input, "change", /*change_handler_7*/ ctx[81], false, false, false),
    				listen_dev(input, "input", /*input_handler_7*/ ctx[82], false, false, false),
    				listen_dev(input, "input", /*input_input_handler_4*/ ctx[152])
    			];
    		},
    		p: function update(ctx, dirty) {
    			set_attributes(input, get_spread_update(input_levels, [
    				dirty[0] & /*props*/ 4096 && /*props*/ ctx[12],
    				dirty[0] & /*id*/ 64 && { id: /*id*/ ctx[6] },
    				{ type: "number" },
    				dirty[0] & /*readonly*/ 16 && { readOnly: /*readonly*/ ctx[4] },
    				dirty[0] & /*classes*/ 1024 && { class: /*classes*/ ctx[10] },
    				dirty[0] & /*name*/ 128 && { name: /*name*/ ctx[7] },
    				dirty[0] & /*disabled*/ 512 && { disabled: /*disabled*/ ctx[9] },
    				dirty[0] & /*placeholder*/ 256 && { placeholder: /*placeholder*/ ctx[8] }
    			]));

    			if (dirty[0] & /*value*/ 2 && to_number(input.value) !== /*value*/ ctx[1]) {
    				set_input_value(input, /*value*/ ctx[1]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input);
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_8.name,
    		type: "if",
    		source: "(214:30) ",
    		ctx
    	});

    	return block;
    }

    // (196:27) 
    function create_if_block_7(ctx) {
    	let input;
    	let dispose;

    	let input_levels = [
    		/*props*/ ctx[12],
    		{ id: /*id*/ ctx[6] },
    		{ type: "url" },
    		{ readOnly: /*readonly*/ ctx[4] },
    		{ class: /*classes*/ ctx[10] },
    		{ name: /*name*/ ctx[7] },
    		{ disabled: /*disabled*/ ctx[9] },
    		{ placeholder: /*placeholder*/ ctx[8] }
    	];

    	let input_data = {};

    	for (let i = 0; i < input_levels.length; i += 1) {
    		input_data = assign(input_data, input_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			input = element("input");
    			set_attributes(input, input_data);
    			add_location(input, file$3, 196, 4, 4270);
    		},
    		m: function mount(target, anchor, remount) {
    			insert_dev(target, input, anchor);
    			set_input_value(input, /*value*/ ctx[1]);
    			if (remount) run_all(dispose);

    			dispose = [
    				listen_dev(input, "blur", /*blur_handler_6*/ ctx[69], false, false, false),
    				listen_dev(input, "focus", /*focus_handler_6*/ ctx[70], false, false, false),
    				listen_dev(input, "keydown", /*keydown_handler_6*/ ctx[71], false, false, false),
    				listen_dev(input, "keypress", /*keypress_handler_6*/ ctx[72], false, false, false),
    				listen_dev(input, "keyup", /*keyup_handler_6*/ ctx[73], false, false, false),
    				listen_dev(input, "change", /*change_handler_6*/ ctx[74], false, false, false),
    				listen_dev(input, "input", /*input_handler_6*/ ctx[75], false, false, false),
    				listen_dev(input, "input", /*input_input_handler_3*/ ctx[151])
    			];
    		},
    		p: function update(ctx, dirty) {
    			set_attributes(input, get_spread_update(input_levels, [
    				dirty[0] & /*props*/ 4096 && /*props*/ ctx[12],
    				dirty[0] & /*id*/ 64 && { id: /*id*/ ctx[6] },
    				{ type: "url" },
    				dirty[0] & /*readonly*/ 16 && { readOnly: /*readonly*/ ctx[4] },
    				dirty[0] & /*classes*/ 1024 && { class: /*classes*/ ctx[10] },
    				dirty[0] & /*name*/ 128 && { name: /*name*/ ctx[7] },
    				dirty[0] & /*disabled*/ 512 && { disabled: /*disabled*/ ctx[9] },
    				dirty[0] & /*placeholder*/ 256 && { placeholder: /*placeholder*/ ctx[8] }
    			]));

    			if (dirty[0] & /*value*/ 2) {
    				set_input_value(input, /*value*/ ctx[1]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input);
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_7.name,
    		type: "if",
    		source: "(196:27) ",
    		ctx
    	});

    	return block;
    }

    // (178:29) 
    function create_if_block_6(ctx) {
    	let input;
    	let dispose;

    	let input_levels = [
    		/*props*/ ctx[12],
    		{ id: /*id*/ ctx[6] },
    		{ type: "radio" },
    		{ readOnly: /*readonly*/ ctx[4] },
    		{ class: /*classes*/ ctx[10] },
    		{ name: /*name*/ ctx[7] },
    		{ disabled: /*disabled*/ ctx[9] },
    		{ placeholder: /*placeholder*/ ctx[8] }
    	];

    	let input_data = {};

    	for (let i = 0; i < input_levels.length; i += 1) {
    		input_data = assign(input_data, input_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			input = element("input");
    			set_attributes(input, input_data);
    			add_location(input, file$3, 178, 4, 3965);
    		},
    		m: function mount(target, anchor, remount) {
    			insert_dev(target, input, anchor);
    			set_input_value(input, /*value*/ ctx[1]);
    			if (remount) run_all(dispose);

    			dispose = [
    				listen_dev(input, "blur", /*blur_handler_5*/ ctx[62], false, false, false),
    				listen_dev(input, "focus", /*focus_handler_5*/ ctx[63], false, false, false),
    				listen_dev(input, "keydown", /*keydown_handler_5*/ ctx[64], false, false, false),
    				listen_dev(input, "keypress", /*keypress_handler_5*/ ctx[65], false, false, false),
    				listen_dev(input, "keyup", /*keyup_handler_5*/ ctx[66], false, false, false),
    				listen_dev(input, "change", /*change_handler_5*/ ctx[67], false, false, false),
    				listen_dev(input, "input", /*input_handler_5*/ ctx[68], false, false, false),
    				listen_dev(input, "change", /*input_change_handler_2*/ ctx[150])
    			];
    		},
    		p: function update(ctx, dirty) {
    			set_attributes(input, get_spread_update(input_levels, [
    				dirty[0] & /*props*/ 4096 && /*props*/ ctx[12],
    				dirty[0] & /*id*/ 64 && { id: /*id*/ ctx[6] },
    				{ type: "radio" },
    				dirty[0] & /*readonly*/ 16 && { readOnly: /*readonly*/ ctx[4] },
    				dirty[0] & /*classes*/ 1024 && { class: /*classes*/ ctx[10] },
    				dirty[0] & /*name*/ 128 && { name: /*name*/ ctx[7] },
    				dirty[0] & /*disabled*/ 512 && { disabled: /*disabled*/ ctx[9] },
    				dirty[0] & /*placeholder*/ 256 && { placeholder: /*placeholder*/ ctx[8] }
    			]));

    			if (dirty[0] & /*value*/ 2) {
    				set_input_value(input, /*value*/ ctx[1]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input);
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_6.name,
    		type: "if",
    		source: "(178:29) ",
    		ctx
    	});

    	return block;
    }

    // (159:32) 
    function create_if_block_5(ctx) {
    	let input;
    	let dispose;

    	let input_levels = [
    		/*props*/ ctx[12],
    		{ id: /*id*/ ctx[6] },
    		{ type: "checkbox" },
    		{ readOnly: /*readonly*/ ctx[4] },
    		{ class: /*classes*/ ctx[10] },
    		{ name: /*name*/ ctx[7] },
    		{ disabled: /*disabled*/ ctx[9] },
    		{ placeholder: /*placeholder*/ ctx[8] }
    	];

    	let input_data = {};

    	for (let i = 0; i < input_levels.length; i += 1) {
    		input_data = assign(input_data, input_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			input = element("input");
    			set_attributes(input, input_data);
    			add_location(input, file$3, 159, 4, 3636);
    		},
    		m: function mount(target, anchor, remount) {
    			insert_dev(target, input, anchor);
    			input.checked = /*checked*/ ctx[0];
    			set_input_value(input, /*value*/ ctx[1]);
    			if (remount) run_all(dispose);

    			dispose = [
    				listen_dev(input, "blur", /*blur_handler_4*/ ctx[55], false, false, false),
    				listen_dev(input, "focus", /*focus_handler_4*/ ctx[56], false, false, false),
    				listen_dev(input, "keydown", /*keydown_handler_4*/ ctx[57], false, false, false),
    				listen_dev(input, "keypress", /*keypress_handler_4*/ ctx[58], false, false, false),
    				listen_dev(input, "keyup", /*keyup_handler_4*/ ctx[59], false, false, false),
    				listen_dev(input, "change", /*change_handler_4*/ ctx[60], false, false, false),
    				listen_dev(input, "input", /*input_handler_4*/ ctx[61], false, false, false),
    				listen_dev(input, "change", /*input_change_handler_1*/ ctx[149])
    			];
    		},
    		p: function update(ctx, dirty) {
    			set_attributes(input, get_spread_update(input_levels, [
    				dirty[0] & /*props*/ 4096 && /*props*/ ctx[12],
    				dirty[0] & /*id*/ 64 && { id: /*id*/ ctx[6] },
    				{ type: "checkbox" },
    				dirty[0] & /*readonly*/ 16 && { readOnly: /*readonly*/ ctx[4] },
    				dirty[0] & /*classes*/ 1024 && { class: /*classes*/ ctx[10] },
    				dirty[0] & /*name*/ 128 && { name: /*name*/ ctx[7] },
    				dirty[0] & /*disabled*/ 512 && { disabled: /*disabled*/ ctx[9] },
    				dirty[0] & /*placeholder*/ 256 && { placeholder: /*placeholder*/ ctx[8] }
    			]));

    			if (dirty[0] & /*checked*/ 1) {
    				input.checked = /*checked*/ ctx[0];
    			}

    			if (dirty[0] & /*value*/ 2) {
    				set_input_value(input, /*value*/ ctx[1]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input);
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_5.name,
    		type: "if",
    		source: "(159:32) ",
    		ctx
    	});

    	return block;
    }

    // (141:28) 
    function create_if_block_4(ctx) {
    	let input;
    	let dispose;

    	let input_levels = [
    		/*props*/ ctx[12],
    		{ id: /*id*/ ctx[6] },
    		{ type: "file" },
    		{ readOnly: /*readonly*/ ctx[4] },
    		{ class: /*classes*/ ctx[10] },
    		{ name: /*name*/ ctx[7] },
    		{ disabled: /*disabled*/ ctx[9] },
    		{ placeholder: /*placeholder*/ ctx[8] }
    	];

    	let input_data = {};

    	for (let i = 0; i < input_levels.length; i += 1) {
    		input_data = assign(input_data, input_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			input = element("input");
    			set_attributes(input, input_data);
    			add_location(input, file$3, 141, 4, 3327);
    		},
    		m: function mount(target, anchor, remount) {
    			insert_dev(target, input, anchor);
    			if (remount) run_all(dispose);

    			dispose = [
    				listen_dev(input, "blur", /*blur_handler_3*/ ctx[48], false, false, false),
    				listen_dev(input, "focus", /*focus_handler_3*/ ctx[49], false, false, false),
    				listen_dev(input, "keydown", /*keydown_handler_3*/ ctx[50], false, false, false),
    				listen_dev(input, "keypress", /*keypress_handler_3*/ ctx[51], false, false, false),
    				listen_dev(input, "keyup", /*keyup_handler_3*/ ctx[52], false, false, false),
    				listen_dev(input, "change", /*change_handler_3*/ ctx[53], false, false, false),
    				listen_dev(input, "input", /*input_handler_3*/ ctx[54], false, false, false),
    				listen_dev(input, "change", /*input_change_handler*/ ctx[148])
    			];
    		},
    		p: function update(ctx, dirty) {
    			set_attributes(input, get_spread_update(input_levels, [
    				dirty[0] & /*props*/ 4096 && /*props*/ ctx[12],
    				dirty[0] & /*id*/ 64 && { id: /*id*/ ctx[6] },
    				{ type: "file" },
    				dirty[0] & /*readonly*/ 16 && { readOnly: /*readonly*/ ctx[4] },
    				dirty[0] & /*classes*/ 1024 && { class: /*classes*/ ctx[10] },
    				dirty[0] & /*name*/ 128 && { name: /*name*/ ctx[7] },
    				dirty[0] & /*disabled*/ 512 && { disabled: /*disabled*/ ctx[9] },
    				dirty[0] & /*placeholder*/ 256 && { placeholder: /*placeholder*/ ctx[8] }
    			]));
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input);
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_4.name,
    		type: "if",
    		source: "(141:28) ",
    		ctx
    	});

    	return block;
    }

    // (123:29) 
    function create_if_block_3$1(ctx) {
    	let input;
    	let dispose;

    	let input_levels = [
    		/*props*/ ctx[12],
    		{ id: /*id*/ ctx[6] },
    		{ type: "email" },
    		{ readOnly: /*readonly*/ ctx[4] },
    		{ class: /*classes*/ ctx[10] },
    		{ name: /*name*/ ctx[7] },
    		{ disabled: /*disabled*/ ctx[9] },
    		{ placeholder: /*placeholder*/ ctx[8] }
    	];

    	let input_data = {};

    	for (let i = 0; i < input_levels.length; i += 1) {
    		input_data = assign(input_data, input_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			input = element("input");
    			set_attributes(input, input_data);
    			add_location(input, file$3, 123, 4, 3021);
    		},
    		m: function mount(target, anchor, remount) {
    			insert_dev(target, input, anchor);
    			set_input_value(input, /*value*/ ctx[1]);
    			if (remount) run_all(dispose);

    			dispose = [
    				listen_dev(input, "blur", /*blur_handler_2*/ ctx[41], false, false, false),
    				listen_dev(input, "focus", /*focus_handler_2*/ ctx[42], false, false, false),
    				listen_dev(input, "keydown", /*keydown_handler_2*/ ctx[43], false, false, false),
    				listen_dev(input, "keypress", /*keypress_handler_2*/ ctx[44], false, false, false),
    				listen_dev(input, "keyup", /*keyup_handler_2*/ ctx[45], false, false, false),
    				listen_dev(input, "change", /*change_handler_2*/ ctx[46], false, false, false),
    				listen_dev(input, "input", /*input_handler_2*/ ctx[47], false, false, false),
    				listen_dev(input, "input", /*input_input_handler_2*/ ctx[147])
    			];
    		},
    		p: function update(ctx, dirty) {
    			set_attributes(input, get_spread_update(input_levels, [
    				dirty[0] & /*props*/ 4096 && /*props*/ ctx[12],
    				dirty[0] & /*id*/ 64 && { id: /*id*/ ctx[6] },
    				{ type: "email" },
    				dirty[0] & /*readonly*/ 16 && { readOnly: /*readonly*/ ctx[4] },
    				dirty[0] & /*classes*/ 1024 && { class: /*classes*/ ctx[10] },
    				dirty[0] & /*name*/ 128 && { name: /*name*/ ctx[7] },
    				dirty[0] & /*disabled*/ 512 && { disabled: /*disabled*/ ctx[9] },
    				dirty[0] & /*placeholder*/ 256 && { placeholder: /*placeholder*/ ctx[8] }
    			]));

    			if (dirty[0] & /*value*/ 2 && input.value !== /*value*/ ctx[1]) {
    				set_input_value(input, /*value*/ ctx[1]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input);
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3$1.name,
    		type: "if",
    		source: "(123:29) ",
    		ctx
    	});

    	return block;
    }

    // (105:32) 
    function create_if_block_2$1(ctx) {
    	let input;
    	let dispose;

    	let input_levels = [
    		/*props*/ ctx[12],
    		{ id: /*id*/ ctx[6] },
    		{ type: "password" },
    		{ readOnly: /*readonly*/ ctx[4] },
    		{ class: /*classes*/ ctx[10] },
    		{ name: /*name*/ ctx[7] },
    		{ disabled: /*disabled*/ ctx[9] },
    		{ placeholder: /*placeholder*/ ctx[8] }
    	];

    	let input_data = {};

    	for (let i = 0; i < input_levels.length; i += 1) {
    		input_data = assign(input_data, input_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			input = element("input");
    			set_attributes(input, input_data);
    			add_location(input, file$3, 105, 4, 2711);
    		},
    		m: function mount(target, anchor, remount) {
    			insert_dev(target, input, anchor);
    			set_input_value(input, /*value*/ ctx[1]);
    			if (remount) run_all(dispose);

    			dispose = [
    				listen_dev(input, "blur", /*blur_handler_1*/ ctx[34], false, false, false),
    				listen_dev(input, "focus", /*focus_handler_1*/ ctx[35], false, false, false),
    				listen_dev(input, "keydown", /*keydown_handler_1*/ ctx[36], false, false, false),
    				listen_dev(input, "keypress", /*keypress_handler_1*/ ctx[37], false, false, false),
    				listen_dev(input, "keyup", /*keyup_handler_1*/ ctx[38], false, false, false),
    				listen_dev(input, "change", /*change_handler_1*/ ctx[39], false, false, false),
    				listen_dev(input, "input", /*input_handler_1*/ ctx[40], false, false, false),
    				listen_dev(input, "input", /*input_input_handler_1*/ ctx[146])
    			];
    		},
    		p: function update(ctx, dirty) {
    			set_attributes(input, get_spread_update(input_levels, [
    				dirty[0] & /*props*/ 4096 && /*props*/ ctx[12],
    				dirty[0] & /*id*/ 64 && { id: /*id*/ ctx[6] },
    				{ type: "password" },
    				dirty[0] & /*readonly*/ 16 && { readOnly: /*readonly*/ ctx[4] },
    				dirty[0] & /*classes*/ 1024 && { class: /*classes*/ ctx[10] },
    				dirty[0] & /*name*/ 128 && { name: /*name*/ ctx[7] },
    				dirty[0] & /*disabled*/ 512 && { disabled: /*disabled*/ ctx[9] },
    				dirty[0] & /*placeholder*/ 256 && { placeholder: /*placeholder*/ ctx[8] }
    			]));

    			if (dirty[0] & /*value*/ 2 && input.value !== /*value*/ ctx[1]) {
    				set_input_value(input, /*value*/ ctx[1]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input);
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$1.name,
    		type: "if",
    		source: "(105:32) ",
    		ctx
    	});

    	return block;
    }

    // (87:2) {#if type === 'text'}
    function create_if_block_1$1(ctx) {
    	let input;
    	let dispose;

    	let input_levels = [
    		/*props*/ ctx[12],
    		{ id: /*id*/ ctx[6] },
    		{ type: "text" },
    		{ readOnly: /*readonly*/ ctx[4] },
    		{ class: /*classes*/ ctx[10] },
    		{ name: /*name*/ ctx[7] },
    		{ disabled: /*disabled*/ ctx[9] },
    		{ placeholder: /*placeholder*/ ctx[8] }
    	];

    	let input_data = {};

    	for (let i = 0; i < input_levels.length; i += 1) {
    		input_data = assign(input_data, input_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			input = element("input");
    			set_attributes(input, input_data);
    			add_location(input, file$3, 87, 4, 2402);
    		},
    		m: function mount(target, anchor, remount) {
    			insert_dev(target, input, anchor);
    			set_input_value(input, /*value*/ ctx[1]);
    			if (remount) run_all(dispose);

    			dispose = [
    				listen_dev(input, "blur", /*blur_handler*/ ctx[27], false, false, false),
    				listen_dev(input, "focus", /*focus_handler*/ ctx[28], false, false, false),
    				listen_dev(input, "keydown", /*keydown_handler*/ ctx[29], false, false, false),
    				listen_dev(input, "keypress", /*keypress_handler*/ ctx[30], false, false, false),
    				listen_dev(input, "keyup", /*keyup_handler*/ ctx[31], false, false, false),
    				listen_dev(input, "change", /*change_handler*/ ctx[32], false, false, false),
    				listen_dev(input, "input", /*input_handler*/ ctx[33], false, false, false),
    				listen_dev(input, "input", /*input_input_handler*/ ctx[145])
    			];
    		},
    		p: function update(ctx, dirty) {
    			set_attributes(input, get_spread_update(input_levels, [
    				dirty[0] & /*props*/ 4096 && /*props*/ ctx[12],
    				dirty[0] & /*id*/ 64 && { id: /*id*/ ctx[6] },
    				{ type: "text" },
    				dirty[0] & /*readonly*/ 16 && { readOnly: /*readonly*/ ctx[4] },
    				dirty[0] & /*classes*/ 1024 && { class: /*classes*/ ctx[10] },
    				dirty[0] & /*name*/ 128 && { name: /*name*/ ctx[7] },
    				dirty[0] & /*disabled*/ 512 && { disabled: /*disabled*/ ctx[9] },
    				dirty[0] & /*placeholder*/ 256 && { placeholder: /*placeholder*/ ctx[8] }
    			]));

    			if (dirty[0] & /*value*/ 2 && input.value !== /*value*/ ctx[1]) {
    				set_input_value(input, /*value*/ ctx[1]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input);
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$1.name,
    		type: "if",
    		source: "(87:2) {#if type === 'text'}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$4(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block$3, create_if_block_15, create_if_block_16, create_if_block_17];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*tag*/ ctx[11] === "input") return 0;
    		if (/*tag*/ ctx[11] === "textarea") return 1;
    		if (/*tag*/ ctx[11] === "select" && !/*multiple*/ ctx[5]) return 2;
    		if (/*tag*/ ctx[11] === "select" && /*multiple*/ ctx[5]) return 3;
    		return -1;
    	}

    	if (~(current_block_type_index = select_block_type(ctx))) {
    		if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    	}

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (~current_block_type_index) {
    				if_blocks[current_block_type_index].m(target, anchor);
    			}

    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if (~current_block_type_index) {
    					if_blocks[current_block_type_index].p(ctx, dirty);
    				}
    			} else {
    				if (if_block) {
    					group_outros();

    					transition_out(if_blocks[previous_block_index], 1, 1, () => {
    						if_blocks[previous_block_index] = null;
    					});

    					check_outros();
    				}

    				if (~current_block_type_index) {
    					if_block = if_blocks[current_block_type_index];

    					if (!if_block) {
    						if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    						if_block.c();
    					}

    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				} else {
    					if_block = null;
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (~current_block_type_index) {
    				if_blocks[current_block_type_index].d(detaching);
    			}

    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let { class: className = "" } = $$props;
    	let { type = "text" } = $$props;
    	let { size = undefined } = $$props;
    	let { bsSize = undefined } = $$props;
    	let { color = undefined } = $$props;
    	let { checked = false } = $$props;
    	let { valid = false } = $$props;
    	let { invalid = false } = $$props;
    	let { plaintext = false } = $$props;
    	let { addon = false } = $$props;
    	let { value = "" } = $$props;
    	let { files = "" } = $$props;
    	let { readonly } = $$props;
    	let { multiple = false } = $$props;
    	let { id = "" } = $$props;
    	let { name = "" } = $$props;
    	let { placeholder = "" } = $$props;
    	let { disabled = false } = $$props;

    	// eslint-disable-next-line no-unused-vars
    	const { type: _omitType, color: _omitColor, ...props } = clean($$props);

    	let classes;
    	let tag;

    	const handleInput = event => {
    		$$invalidate(1, value = event.target.value);
    	};

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Input", $$slots, ['default']);

    	function blur_handler(event) {
    		bubble($$self, event);
    	}

    	function focus_handler(event) {
    		bubble($$self, event);
    	}

    	function keydown_handler(event) {
    		bubble($$self, event);
    	}

    	function keypress_handler(event) {
    		bubble($$self, event);
    	}

    	function keyup_handler(event) {
    		bubble($$self, event);
    	}

    	function change_handler(event) {
    		bubble($$self, event);
    	}

    	function input_handler(event) {
    		bubble($$self, event);
    	}

    	function blur_handler_1(event) {
    		bubble($$self, event);
    	}

    	function focus_handler_1(event) {
    		bubble($$self, event);
    	}

    	function keydown_handler_1(event) {
    		bubble($$self, event);
    	}

    	function keypress_handler_1(event) {
    		bubble($$self, event);
    	}

    	function keyup_handler_1(event) {
    		bubble($$self, event);
    	}

    	function change_handler_1(event) {
    		bubble($$self, event);
    	}

    	function input_handler_1(event) {
    		bubble($$self, event);
    	}

    	function blur_handler_2(event) {
    		bubble($$self, event);
    	}

    	function focus_handler_2(event) {
    		bubble($$self, event);
    	}

    	function keydown_handler_2(event) {
    		bubble($$self, event);
    	}

    	function keypress_handler_2(event) {
    		bubble($$self, event);
    	}

    	function keyup_handler_2(event) {
    		bubble($$self, event);
    	}

    	function change_handler_2(event) {
    		bubble($$self, event);
    	}

    	function input_handler_2(event) {
    		bubble($$self, event);
    	}

    	function blur_handler_3(event) {
    		bubble($$self, event);
    	}

    	function focus_handler_3(event) {
    		bubble($$self, event);
    	}

    	function keydown_handler_3(event) {
    		bubble($$self, event);
    	}

    	function keypress_handler_3(event) {
    		bubble($$self, event);
    	}

    	function keyup_handler_3(event) {
    		bubble($$self, event);
    	}

    	function change_handler_3(event) {
    		bubble($$self, event);
    	}

    	function input_handler_3(event) {
    		bubble($$self, event);
    	}

    	function blur_handler_4(event) {
    		bubble($$self, event);
    	}

    	function focus_handler_4(event) {
    		bubble($$self, event);
    	}

    	function keydown_handler_4(event) {
    		bubble($$self, event);
    	}

    	function keypress_handler_4(event) {
    		bubble($$self, event);
    	}

    	function keyup_handler_4(event) {
    		bubble($$self, event);
    	}

    	function change_handler_4(event) {
    		bubble($$self, event);
    	}

    	function input_handler_4(event) {
    		bubble($$self, event);
    	}

    	function blur_handler_5(event) {
    		bubble($$self, event);
    	}

    	function focus_handler_5(event) {
    		bubble($$self, event);
    	}

    	function keydown_handler_5(event) {
    		bubble($$self, event);
    	}

    	function keypress_handler_5(event) {
    		bubble($$self, event);
    	}

    	function keyup_handler_5(event) {
    		bubble($$self, event);
    	}

    	function change_handler_5(event) {
    		bubble($$self, event);
    	}

    	function input_handler_5(event) {
    		bubble($$self, event);
    	}

    	function blur_handler_6(event) {
    		bubble($$self, event);
    	}

    	function focus_handler_6(event) {
    		bubble($$self, event);
    	}

    	function keydown_handler_6(event) {
    		bubble($$self, event);
    	}

    	function keypress_handler_6(event) {
    		bubble($$self, event);
    	}

    	function keyup_handler_6(event) {
    		bubble($$self, event);
    	}

    	function change_handler_6(event) {
    		bubble($$self, event);
    	}

    	function input_handler_6(event) {
    		bubble($$self, event);
    	}

    	function blur_handler_7(event) {
    		bubble($$self, event);
    	}

    	function focus_handler_7(event) {
    		bubble($$self, event);
    	}

    	function keydown_handler_7(event) {
    		bubble($$self, event);
    	}

    	function keypress_handler_7(event) {
    		bubble($$self, event);
    	}

    	function keyup_handler_7(event) {
    		bubble($$self, event);
    	}

    	function change_handler_7(event) {
    		bubble($$self, event);
    	}

    	function input_handler_7(event) {
    		bubble($$self, event);
    	}

    	function blur_handler_8(event) {
    		bubble($$self, event);
    	}

    	function focus_handler_8(event) {
    		bubble($$self, event);
    	}

    	function keydown_handler_8(event) {
    		bubble($$self, event);
    	}

    	function keypress_handler_8(event) {
    		bubble($$self, event);
    	}

    	function keyup_handler_8(event) {
    		bubble($$self, event);
    	}

    	function change_handler_8(event) {
    		bubble($$self, event);
    	}

    	function input_handler_8(event) {
    		bubble($$self, event);
    	}

    	function blur_handler_9(event) {
    		bubble($$self, event);
    	}

    	function focus_handler_9(event) {
    		bubble($$self, event);
    	}

    	function keydown_handler_9(event) {
    		bubble($$self, event);
    	}

    	function keypress_handler_9(event) {
    		bubble($$self, event);
    	}

    	function keyup_handler_9(event) {
    		bubble($$self, event);
    	}

    	function change_handler_9(event) {
    		bubble($$self, event);
    	}

    	function input_handler_9(event) {
    		bubble($$self, event);
    	}

    	function blur_handler_10(event) {
    		bubble($$self, event);
    	}

    	function focus_handler_10(event) {
    		bubble($$self, event);
    	}

    	function keydown_handler_10(event) {
    		bubble($$self, event);
    	}

    	function keypress_handler_10(event) {
    		bubble($$self, event);
    	}

    	function keyup_handler_10(event) {
    		bubble($$self, event);
    	}

    	function change_handler_10(event) {
    		bubble($$self, event);
    	}

    	function input_handler_10(event) {
    		bubble($$self, event);
    	}

    	function blur_handler_11(event) {
    		bubble($$self, event);
    	}

    	function focus_handler_11(event) {
    		bubble($$self, event);
    	}

    	function keydown_handler_11(event) {
    		bubble($$self, event);
    	}

    	function keypress_handler_11(event) {
    		bubble($$self, event);
    	}

    	function keyup_handler_11(event) {
    		bubble($$self, event);
    	}

    	function change_handler_11(event) {
    		bubble($$self, event);
    	}

    	function input_handler_11(event) {
    		bubble($$self, event);
    	}

    	function blur_handler_12(event) {
    		bubble($$self, event);
    	}

    	function focus_handler_12(event) {
    		bubble($$self, event);
    	}

    	function keydown_handler_12(event) {
    		bubble($$self, event);
    	}

    	function keypress_handler_12(event) {
    		bubble($$self, event);
    	}

    	function keyup_handler_12(event) {
    		bubble($$self, event);
    	}

    	function change_handler_12(event) {
    		bubble($$self, event);
    	}

    	function input_handler_12(event) {
    		bubble($$self, event);
    	}

    	function blur_handler_13(event) {
    		bubble($$self, event);
    	}

    	function focus_handler_13(event) {
    		bubble($$self, event);
    	}

    	function keydown_handler_13(event) {
    		bubble($$self, event);
    	}

    	function keypress_handler_13(event) {
    		bubble($$self, event);
    	}

    	function keyup_handler_13(event) {
    		bubble($$self, event);
    	}

    	function change_handler_13(event) {
    		bubble($$self, event);
    	}

    	function input_handler_13(event) {
    		bubble($$self, event);
    	}

    	function blur_handler_14(event) {
    		bubble($$self, event);
    	}

    	function focus_handler_14(event) {
    		bubble($$self, event);
    	}

    	function keydown_handler_14(event) {
    		bubble($$self, event);
    	}

    	function keypress_handler_14(event) {
    		bubble($$self, event);
    	}

    	function keyup_handler_14(event) {
    		bubble($$self, event);
    	}

    	function blur_handler_15(event) {
    		bubble($$self, event);
    	}

    	function focus_handler_15(event) {
    		bubble($$self, event);
    	}

    	function keydown_handler_15(event) {
    		bubble($$self, event);
    	}

    	function keypress_handler_15(event) {
    		bubble($$self, event);
    	}

    	function keyup_handler_15(event) {
    		bubble($$self, event);
    	}

    	function change_handler_14(event) {
    		bubble($$self, event);
    	}

    	function input_handler_14(event) {
    		bubble($$self, event);
    	}

    	function blur_handler_16(event) {
    		bubble($$self, event);
    	}

    	function focus_handler_16(event) {
    		bubble($$self, event);
    	}

    	function change_handler_15(event) {
    		bubble($$self, event);
    	}

    	function input_handler_15(event) {
    		bubble($$self, event);
    	}

    	function blur_handler_17(event) {
    		bubble($$self, event);
    	}

    	function focus_handler_17(event) {
    		bubble($$self, event);
    	}

    	function change_handler_16(event) {
    		bubble($$self, event);
    	}

    	function input_handler_16(event) {
    		bubble($$self, event);
    	}

    	function input_input_handler() {
    		value = this.value;
    		$$invalidate(1, value);
    	}

    	function input_input_handler_1() {
    		value = this.value;
    		$$invalidate(1, value);
    	}

    	function input_input_handler_2() {
    		value = this.value;
    		$$invalidate(1, value);
    	}

    	function input_change_handler() {
    		files = this.files;
    		$$invalidate(2, files);
    	}

    	function input_change_handler_1() {
    		checked = this.checked;
    		value = this.value;
    		$$invalidate(0, checked);
    		$$invalidate(1, value);
    	}

    	function input_change_handler_2() {
    		value = this.value;
    		$$invalidate(1, value);
    	}

    	function input_input_handler_3() {
    		value = this.value;
    		$$invalidate(1, value);
    	}

    	function input_input_handler_4() {
    		value = to_number(this.value);
    		$$invalidate(1, value);
    	}

    	function input_input_handler_5() {
    		value = this.value;
    		$$invalidate(1, value);
    	}

    	function input_input_handler_6() {
    		value = this.value;
    		$$invalidate(1, value);
    	}

    	function input_input_handler_7() {
    		value = this.value;
    		$$invalidate(1, value);
    	}

    	function input_input_handler_8() {
    		value = this.value;
    		$$invalidate(1, value);
    	}

    	function input_change_input_handler() {
    		value = to_number(this.value);
    		$$invalidate(1, value);
    	}

    	function input_input_handler_9() {
    		value = this.value;
    		$$invalidate(1, value);
    	}

    	function textarea_input_handler() {
    		value = this.value;
    		$$invalidate(1, value);
    	}

    	function select_change_handler() {
    		value = select_value(this);
    		$$invalidate(1, value);
    	}

    	function select_change_handler_1() {
    		value = select_multiple_value(this);
    		$$invalidate(1, value);
    	}

    	$$self.$set = $$new_props => {
    		$$invalidate(24, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    		if ("class" in $$new_props) $$invalidate(16, className = $$new_props.class);
    		if ("type" in $$new_props) $$invalidate(3, type = $$new_props.type);
    		if ("size" in $$new_props) $$invalidate(14, size = $$new_props.size);
    		if ("bsSize" in $$new_props) $$invalidate(15, bsSize = $$new_props.bsSize);
    		if ("color" in $$new_props) $$invalidate(17, color = $$new_props.color);
    		if ("checked" in $$new_props) $$invalidate(0, checked = $$new_props.checked);
    		if ("valid" in $$new_props) $$invalidate(18, valid = $$new_props.valid);
    		if ("invalid" in $$new_props) $$invalidate(19, invalid = $$new_props.invalid);
    		if ("plaintext" in $$new_props) $$invalidate(20, plaintext = $$new_props.plaintext);
    		if ("addon" in $$new_props) $$invalidate(21, addon = $$new_props.addon);
    		if ("value" in $$new_props) $$invalidate(1, value = $$new_props.value);
    		if ("files" in $$new_props) $$invalidate(2, files = $$new_props.files);
    		if ("readonly" in $$new_props) $$invalidate(4, readonly = $$new_props.readonly);
    		if ("multiple" in $$new_props) $$invalidate(5, multiple = $$new_props.multiple);
    		if ("id" in $$new_props) $$invalidate(6, id = $$new_props.id);
    		if ("name" in $$new_props) $$invalidate(7, name = $$new_props.name);
    		if ("placeholder" in $$new_props) $$invalidate(8, placeholder = $$new_props.placeholder);
    		if ("disabled" in $$new_props) $$invalidate(9, disabled = $$new_props.disabled);
    		if ("$$scope" in $$new_props) $$invalidate(25, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		clsx,
    		clean,
    		className,
    		type,
    		size,
    		bsSize,
    		color,
    		checked,
    		valid,
    		invalid,
    		plaintext,
    		addon,
    		value,
    		files,
    		readonly,
    		multiple,
    		id,
    		name,
    		placeholder,
    		disabled,
    		_omitType,
    		_omitColor,
    		props,
    		classes,
    		tag,
    		handleInput
    	});

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(24, $$props = assign(assign({}, $$props), $$new_props));
    		if ("className" in $$props) $$invalidate(16, className = $$new_props.className);
    		if ("type" in $$props) $$invalidate(3, type = $$new_props.type);
    		if ("size" in $$props) $$invalidate(14, size = $$new_props.size);
    		if ("bsSize" in $$props) $$invalidate(15, bsSize = $$new_props.bsSize);
    		if ("color" in $$props) $$invalidate(17, color = $$new_props.color);
    		if ("checked" in $$props) $$invalidate(0, checked = $$new_props.checked);
    		if ("valid" in $$props) $$invalidate(18, valid = $$new_props.valid);
    		if ("invalid" in $$props) $$invalidate(19, invalid = $$new_props.invalid);
    		if ("plaintext" in $$props) $$invalidate(20, plaintext = $$new_props.plaintext);
    		if ("addon" in $$props) $$invalidate(21, addon = $$new_props.addon);
    		if ("value" in $$props) $$invalidate(1, value = $$new_props.value);
    		if ("files" in $$props) $$invalidate(2, files = $$new_props.files);
    		if ("readonly" in $$props) $$invalidate(4, readonly = $$new_props.readonly);
    		if ("multiple" in $$props) $$invalidate(5, multiple = $$new_props.multiple);
    		if ("id" in $$props) $$invalidate(6, id = $$new_props.id);
    		if ("name" in $$props) $$invalidate(7, name = $$new_props.name);
    		if ("placeholder" in $$props) $$invalidate(8, placeholder = $$new_props.placeholder);
    		if ("disabled" in $$props) $$invalidate(9, disabled = $$new_props.disabled);
    		if ("classes" in $$props) $$invalidate(10, classes = $$new_props.classes);
    		if ("tag" in $$props) $$invalidate(11, tag = $$new_props.tag);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty[0] & /*type, plaintext, addon, color, size, className, invalid, valid, bsSize*/ 4177928) {
    			 {
    				const checkInput = ["radio", "checkbox"].indexOf(type) > -1;
    				const isNotaNumber = new RegExp("\\D", "g");
    				const fileInput = type === "file";
    				const textareaInput = type === "textarea";
    				const rangeInput = type === "range";
    				const selectInput = type === "select";
    				const buttonInput = type === "button" || type === "reset" || type === "submit";
    				const unsupportedInput = type === "hidden" || type === "image";
    				$$invalidate(11, tag = selectInput || textareaInput ? type : "input");
    				let formControlClass = "form-control";

    				if (plaintext) {
    					formControlClass = `${formControlClass}-plaintext`;
    					$$invalidate(11, tag = "input");
    				} else if (fileInput) {
    					formControlClass = `${formControlClass}-file`;
    				} else if (checkInput) {
    					if (addon) {
    						formControlClass = null;
    					} else {
    						formControlClass = "form-check-input";
    					}
    				} else if (buttonInput) {
    					formControlClass = `btn btn-${color || "secondary"}`;
    				} else if (rangeInput) {
    					formControlClass = "form-control-range";
    				} else if (unsupportedInput) {
    					formControlClass = "";
    				}

    				if (size && isNotaNumber.test(size)) {
    					console.warn("Please use the prop \"bsSize\" instead of the \"size\" to bootstrap's input sizing.");
    					$$invalidate(15, bsSize = size);
    					$$invalidate(14, size = undefined);
    				}

    				$$invalidate(10, classes = clsx(className, invalid && "is-invalid", valid && "is-valid", bsSize ? `form-control-${bsSize}` : false, formControlClass));
    			}
    		}
    	};

    	$$props = exclude_internal_props($$props);

    	return [
    		checked,
    		value,
    		files,
    		type,
    		readonly,
    		multiple,
    		id,
    		name,
    		placeholder,
    		disabled,
    		classes,
    		tag,
    		props,
    		handleInput,
    		size,
    		bsSize,
    		className,
    		color,
    		valid,
    		invalid,
    		plaintext,
    		addon,
    		_omitType,
    		_omitColor,
    		$$props,
    		$$scope,
    		$$slots,
    		blur_handler,
    		focus_handler,
    		keydown_handler,
    		keypress_handler,
    		keyup_handler,
    		change_handler,
    		input_handler,
    		blur_handler_1,
    		focus_handler_1,
    		keydown_handler_1,
    		keypress_handler_1,
    		keyup_handler_1,
    		change_handler_1,
    		input_handler_1,
    		blur_handler_2,
    		focus_handler_2,
    		keydown_handler_2,
    		keypress_handler_2,
    		keyup_handler_2,
    		change_handler_2,
    		input_handler_2,
    		blur_handler_3,
    		focus_handler_3,
    		keydown_handler_3,
    		keypress_handler_3,
    		keyup_handler_3,
    		change_handler_3,
    		input_handler_3,
    		blur_handler_4,
    		focus_handler_4,
    		keydown_handler_4,
    		keypress_handler_4,
    		keyup_handler_4,
    		change_handler_4,
    		input_handler_4,
    		blur_handler_5,
    		focus_handler_5,
    		keydown_handler_5,
    		keypress_handler_5,
    		keyup_handler_5,
    		change_handler_5,
    		input_handler_5,
    		blur_handler_6,
    		focus_handler_6,
    		keydown_handler_6,
    		keypress_handler_6,
    		keyup_handler_6,
    		change_handler_6,
    		input_handler_6,
    		blur_handler_7,
    		focus_handler_7,
    		keydown_handler_7,
    		keypress_handler_7,
    		keyup_handler_7,
    		change_handler_7,
    		input_handler_7,
    		blur_handler_8,
    		focus_handler_8,
    		keydown_handler_8,
    		keypress_handler_8,
    		keyup_handler_8,
    		change_handler_8,
    		input_handler_8,
    		blur_handler_9,
    		focus_handler_9,
    		keydown_handler_9,
    		keypress_handler_9,
    		keyup_handler_9,
    		change_handler_9,
    		input_handler_9,
    		blur_handler_10,
    		focus_handler_10,
    		keydown_handler_10,
    		keypress_handler_10,
    		keyup_handler_10,
    		change_handler_10,
    		input_handler_10,
    		blur_handler_11,
    		focus_handler_11,
    		keydown_handler_11,
    		keypress_handler_11,
    		keyup_handler_11,
    		change_handler_11,
    		input_handler_11,
    		blur_handler_12,
    		focus_handler_12,
    		keydown_handler_12,
    		keypress_handler_12,
    		keyup_handler_12,
    		change_handler_12,
    		input_handler_12,
    		blur_handler_13,
    		focus_handler_13,
    		keydown_handler_13,
    		keypress_handler_13,
    		keyup_handler_13,
    		change_handler_13,
    		input_handler_13,
    		blur_handler_14,
    		focus_handler_14,
    		keydown_handler_14,
    		keypress_handler_14,
    		keyup_handler_14,
    		blur_handler_15,
    		focus_handler_15,
    		keydown_handler_15,
    		keypress_handler_15,
    		keyup_handler_15,
    		change_handler_14,
    		input_handler_14,
    		blur_handler_16,
    		focus_handler_16,
    		change_handler_15,
    		input_handler_15,
    		blur_handler_17,
    		focus_handler_17,
    		change_handler_16,
    		input_handler_16,
    		input_input_handler,
    		input_input_handler_1,
    		input_input_handler_2,
    		input_change_handler,
    		input_change_handler_1,
    		input_change_handler_2,
    		input_input_handler_3,
    		input_input_handler_4,
    		input_input_handler_5,
    		input_input_handler_6,
    		input_input_handler_7,
    		input_input_handler_8,
    		input_change_input_handler,
    		input_input_handler_9,
    		textarea_input_handler,
    		select_change_handler,
    		select_change_handler_1
    	];
    }

    class Input extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(
    			this,
    			options,
    			instance$4,
    			create_fragment$4,
    			safe_not_equal,
    			{
    				class: 16,
    				type: 3,
    				size: 14,
    				bsSize: 15,
    				color: 17,
    				checked: 0,
    				valid: 18,
    				invalid: 19,
    				plaintext: 20,
    				addon: 21,
    				value: 1,
    				files: 2,
    				readonly: 4,
    				multiple: 5,
    				id: 6,
    				name: 7,
    				placeholder: 8,
    				disabled: 9
    			},
    			[-1, -1, -1, -1, -1, -1]
    		);

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Input",
    			options,
    			id: create_fragment$4.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*readonly*/ ctx[4] === undefined && !("readonly" in props)) {
    			console_1$1.warn("<Input> was created without expected prop 'readonly'");
    		}
    	}

    	get class() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get type() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set type(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get size() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get bsSize() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set bsSize(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get color() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get checked() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set checked(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get valid() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set valid(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get invalid() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set invalid(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get plaintext() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set plaintext(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get addon() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set addon(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get value() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set value(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get files() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set files(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get readonly() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set readonly(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get multiple() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set multiple(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get id() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set id(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get name() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set name(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get placeholder() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set placeholder(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get disabled() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set disabled(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules\sveltestrap\src\Label.svelte generated by Svelte v3.21.0 */
    const file$4 = "node_modules\\sveltestrap\\src\\Label.svelte";

    function create_fragment$5(ctx) {
    	let label;
    	let current;
    	const default_slot_template = /*$$slots*/ ctx[18].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[17], null);

    	let label_levels = [
    		/*props*/ ctx[3],
    		{ id: /*id*/ ctx[1] },
    		{ class: /*classes*/ ctx[2] },
    		{ for: /*fore*/ ctx[0] }
    	];

    	let label_data = {};

    	for (let i = 0; i < label_levels.length; i += 1) {
    		label_data = assign(label_data, label_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			label = element("label");
    			if (default_slot) default_slot.c();
    			set_attributes(label, label_data);
    			add_location(label, file$4, 73, 0, 1685);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, label, anchor);

    			if (default_slot) {
    				default_slot.m(label, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && dirty & /*$$scope*/ 131072) {
    					default_slot.p(get_slot_context(default_slot_template, ctx, /*$$scope*/ ctx[17], null), get_slot_changes(default_slot_template, /*$$scope*/ ctx[17], dirty, null));
    				}
    			}

    			set_attributes(label, get_spread_update(label_levels, [
    				dirty & /*props*/ 8 && /*props*/ ctx[3],
    				dirty & /*id*/ 2 && { id: /*id*/ ctx[1] },
    				dirty & /*classes*/ 4 && { class: /*classes*/ ctx[2] },
    				dirty & /*fore*/ 1 && { for: /*fore*/ ctx[0] }
    			]));
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(label);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let { class: className = "" } = $$props;
    	const props = clean($$props);
    	let { hidden = false } = $$props;
    	let { check = false } = $$props;
    	let { size = "" } = $$props;
    	let { for: fore } = $$props;
    	let { id = "" } = $$props;
    	let { xs = "" } = $$props;
    	let { sm = "" } = $$props;
    	let { md = "" } = $$props;
    	let { lg = "" } = $$props;
    	let { xl = "" } = $$props;
    	const colWidths = { xs, sm, md, lg, xl };
    	let { widths = Object.keys(colWidths) } = $$props;
    	const colClasses = [];

    	widths.forEach(colWidth => {
    		let columnProp = $$props[colWidth];

    		if (!columnProp && columnProp !== "") {
    			return;
    		}

    		const isXs = colWidth === "xs";
    		let colClass;

    		if (isObject(columnProp)) {
    			const colSizeInterfix = isXs ? "-" : `-${colWidth}-`;
    			colClass = getColumnSizeClass(isXs, colWidth, columnProp.size);

    			colClasses.push(clsx({
    				[colClass]: columnProp.size || columnProp.size === "",
    				[`order${colSizeInterfix}${columnProp.order}`]: columnProp.order || columnProp.order === 0,
    				[`offset${colSizeInterfix}${columnProp.offset}`]: columnProp.offset || columnProp.offset === 0
    			}));
    		} else {
    			colClass = getColumnSizeClass(isXs, colWidth, columnProp);
    			colClasses.push(colClass);
    		}
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Label", $$slots, ['default']);

    	$$self.$set = $$new_props => {
    		$$invalidate(16, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    		if ("class" in $$new_props) $$invalidate(4, className = $$new_props.class);
    		if ("hidden" in $$new_props) $$invalidate(5, hidden = $$new_props.hidden);
    		if ("check" in $$new_props) $$invalidate(6, check = $$new_props.check);
    		if ("size" in $$new_props) $$invalidate(7, size = $$new_props.size);
    		if ("for" in $$new_props) $$invalidate(0, fore = $$new_props.for);
    		if ("id" in $$new_props) $$invalidate(1, id = $$new_props.id);
    		if ("xs" in $$new_props) $$invalidate(8, xs = $$new_props.xs);
    		if ("sm" in $$new_props) $$invalidate(9, sm = $$new_props.sm);
    		if ("md" in $$new_props) $$invalidate(10, md = $$new_props.md);
    		if ("lg" in $$new_props) $$invalidate(11, lg = $$new_props.lg);
    		if ("xl" in $$new_props) $$invalidate(12, xl = $$new_props.xl);
    		if ("widths" in $$new_props) $$invalidate(13, widths = $$new_props.widths);
    		if ("$$scope" in $$new_props) $$invalidate(17, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		clsx,
    		clean,
    		getColumnSizeClass,
    		isObject,
    		className,
    		props,
    		hidden,
    		check,
    		size,
    		fore,
    		id,
    		xs,
    		sm,
    		md,
    		lg,
    		xl,
    		colWidths,
    		widths,
    		colClasses,
    		classes
    	});

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(16, $$props = assign(assign({}, $$props), $$new_props));
    		if ("className" in $$props) $$invalidate(4, className = $$new_props.className);
    		if ("hidden" in $$props) $$invalidate(5, hidden = $$new_props.hidden);
    		if ("check" in $$props) $$invalidate(6, check = $$new_props.check);
    		if ("size" in $$props) $$invalidate(7, size = $$new_props.size);
    		if ("fore" in $$props) $$invalidate(0, fore = $$new_props.fore);
    		if ("id" in $$props) $$invalidate(1, id = $$new_props.id);
    		if ("xs" in $$props) $$invalidate(8, xs = $$new_props.xs);
    		if ("sm" in $$props) $$invalidate(9, sm = $$new_props.sm);
    		if ("md" in $$props) $$invalidate(10, md = $$new_props.md);
    		if ("lg" in $$props) $$invalidate(11, lg = $$new_props.lg);
    		if ("xl" in $$props) $$invalidate(12, xl = $$new_props.xl);
    		if ("widths" in $$props) $$invalidate(13, widths = $$new_props.widths);
    		if ("classes" in $$props) $$invalidate(2, classes = $$new_props.classes);
    	};

    	let classes;

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*className, hidden, check, size*/ 240) {
    			 $$invalidate(2, classes = clsx(className, hidden ? "sr-only" : false, check ? "form-check-label" : false, size ? `col-form-label-${size}` : false, colClasses, colClasses.length ? "col-form-label" : false));
    		}
    	};

    	$$props = exclude_internal_props($$props);

    	return [
    		fore,
    		id,
    		classes,
    		props,
    		className,
    		hidden,
    		check,
    		size,
    		xs,
    		sm,
    		md,
    		lg,
    		xl,
    		widths,
    		colWidths,
    		colClasses,
    		$$props,
    		$$scope,
    		$$slots
    	];
    }

    class Label extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$5, create_fragment$5, safe_not_equal, {
    			class: 4,
    			hidden: 5,
    			check: 6,
    			size: 7,
    			for: 0,
    			id: 1,
    			xs: 8,
    			sm: 9,
    			md: 10,
    			lg: 11,
    			xl: 12,
    			widths: 13
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Label",
    			options,
    			id: create_fragment$5.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*fore*/ ctx[0] === undefined && !("for" in props)) {
    			console.warn("<Label> was created without expected prop 'for'");
    		}
    	}

    	get class() {
    		throw new Error("<Label>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<Label>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get hidden() {
    		throw new Error("<Label>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set hidden(value) {
    		throw new Error("<Label>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get check() {
    		throw new Error("<Label>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set check(value) {
    		throw new Error("<Label>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get size() {
    		throw new Error("<Label>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<Label>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get for() {
    		throw new Error("<Label>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set for(value) {
    		throw new Error("<Label>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get id() {
    		throw new Error("<Label>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set id(value) {
    		throw new Error("<Label>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get xs() {
    		throw new Error("<Label>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set xs(value) {
    		throw new Error("<Label>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get sm() {
    		throw new Error("<Label>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set sm(value) {
    		throw new Error("<Label>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get md() {
    		throw new Error("<Label>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set md(value) {
    		throw new Error("<Label>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get lg() {
    		throw new Error("<Label>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set lg(value) {
    		throw new Error("<Label>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get xl() {
    		throw new Error("<Label>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set xl(value) {
    		throw new Error("<Label>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get widths() {
    		throw new Error("<Label>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set widths(value) {
    		throw new Error("<Label>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules\sveltestrap\src\FormGroup.svelte generated by Svelte v3.21.0 */
    const file$5 = "node_modules\\sveltestrap\\src\\FormGroup.svelte";

    // (29:0) {:else}
    function create_else_block$4(ctx) {
    	let div;
    	let current;
    	const default_slot_template = /*$$slots*/ ctx[11].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[10], null);
    	let div_levels = [/*props*/ ctx[3], { id: /*id*/ ctx[0] }, { class: /*classes*/ ctx[2] }];
    	let div_data = {};

    	for (let i = 0; i < div_levels.length; i += 1) {
    		div_data = assign(div_data, div_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			set_attributes(div, div_data);
    			add_location(div, file$5, 29, 2, 648);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && dirty & /*$$scope*/ 1024) {
    					default_slot.p(get_slot_context(default_slot_template, ctx, /*$$scope*/ ctx[10], null), get_slot_changes(default_slot_template, /*$$scope*/ ctx[10], dirty, null));
    				}
    			}

    			set_attributes(div, get_spread_update(div_levels, [
    				dirty & /*props*/ 8 && /*props*/ ctx[3],
    				dirty & /*id*/ 1 && { id: /*id*/ ctx[0] },
    				dirty & /*classes*/ 4 && { class: /*classes*/ ctx[2] }
    			]));
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$4.name,
    		type: "else",
    		source: "(29:0) {:else}",
    		ctx
    	});

    	return block;
    }

    // (25:0) {#if tag === 'fieldset'}
    function create_if_block$4(ctx) {
    	let fieldset;
    	let current;
    	const default_slot_template = /*$$slots*/ ctx[11].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[10], null);
    	let fieldset_levels = [/*props*/ ctx[3], { id: /*id*/ ctx[0] }, { class: /*classes*/ ctx[2] }];
    	let fieldset_data = {};

    	for (let i = 0; i < fieldset_levels.length; i += 1) {
    		fieldset_data = assign(fieldset_data, fieldset_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			fieldset = element("fieldset");
    			if (default_slot) default_slot.c();
    			set_attributes(fieldset, fieldset_data);
    			add_location(fieldset, file$5, 25, 2, 568);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, fieldset, anchor);

    			if (default_slot) {
    				default_slot.m(fieldset, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && dirty & /*$$scope*/ 1024) {
    					default_slot.p(get_slot_context(default_slot_template, ctx, /*$$scope*/ ctx[10], null), get_slot_changes(default_slot_template, /*$$scope*/ ctx[10], dirty, null));
    				}
    			}

    			set_attributes(fieldset, get_spread_update(fieldset_levels, [
    				dirty & /*props*/ 8 && /*props*/ ctx[3],
    				dirty & /*id*/ 1 && { id: /*id*/ ctx[0] },
    				dirty & /*classes*/ 4 && { class: /*classes*/ ctx[2] }
    			]));
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(fieldset);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$4.name,
    		type: "if",
    		source: "(25:0) {#if tag === 'fieldset'}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$6(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block$4, create_else_block$4];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*tag*/ ctx[1] === "fieldset") return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props, $$invalidate) {
    	let { class: className = "" } = $$props;
    	let { row = false } = $$props;
    	let { check = false } = $$props;
    	let { inline = false } = $$props;
    	let { disabled = false } = $$props;
    	let { id = "" } = $$props;
    	let { tag = null } = $$props;
    	const props = clean($$props);
    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("FormGroup", $$slots, ['default']);

    	$$self.$set = $$new_props => {
    		$$invalidate(9, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    		if ("class" in $$new_props) $$invalidate(4, className = $$new_props.class);
    		if ("row" in $$new_props) $$invalidate(5, row = $$new_props.row);
    		if ("check" in $$new_props) $$invalidate(6, check = $$new_props.check);
    		if ("inline" in $$new_props) $$invalidate(7, inline = $$new_props.inline);
    		if ("disabled" in $$new_props) $$invalidate(8, disabled = $$new_props.disabled);
    		if ("id" in $$new_props) $$invalidate(0, id = $$new_props.id);
    		if ("tag" in $$new_props) $$invalidate(1, tag = $$new_props.tag);
    		if ("$$scope" in $$new_props) $$invalidate(10, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		clsx,
    		clean,
    		className,
    		row,
    		check,
    		inline,
    		disabled,
    		id,
    		tag,
    		props,
    		classes
    	});

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(9, $$props = assign(assign({}, $$props), $$new_props));
    		if ("className" in $$props) $$invalidate(4, className = $$new_props.className);
    		if ("row" in $$props) $$invalidate(5, row = $$new_props.row);
    		if ("check" in $$props) $$invalidate(6, check = $$new_props.check);
    		if ("inline" in $$props) $$invalidate(7, inline = $$new_props.inline);
    		if ("disabled" in $$props) $$invalidate(8, disabled = $$new_props.disabled);
    		if ("id" in $$props) $$invalidate(0, id = $$new_props.id);
    		if ("tag" in $$props) $$invalidate(1, tag = $$new_props.tag);
    		if ("classes" in $$props) $$invalidate(2, classes = $$new_props.classes);
    	};

    	let classes;

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*className, row, check, inline, disabled*/ 496) {
    			 $$invalidate(2, classes = clsx(className, row ? "row" : false, check ? "form-check" : "form-group", check && inline ? "form-check-inline" : false, check && disabled ? "disabled" : false));
    		}
    	};

    	$$props = exclude_internal_props($$props);

    	return [
    		id,
    		tag,
    		classes,
    		props,
    		className,
    		row,
    		check,
    		inline,
    		disabled,
    		$$props,
    		$$scope,
    		$$slots
    	];
    }

    class FormGroup extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$6, create_fragment$6, safe_not_equal, {
    			class: 4,
    			row: 5,
    			check: 6,
    			inline: 7,
    			disabled: 8,
    			id: 0,
    			tag: 1
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "FormGroup",
    			options,
    			id: create_fragment$6.name
    		});
    	}

    	get class() {
    		throw new Error("<FormGroup>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<FormGroup>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get row() {
    		throw new Error("<FormGroup>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set row(value) {
    		throw new Error("<FormGroup>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get check() {
    		throw new Error("<FormGroup>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set check(value) {
    		throw new Error("<FormGroup>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get inline() {
    		throw new Error("<FormGroup>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set inline(value) {
    		throw new Error("<FormGroup>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get disabled() {
    		throw new Error("<FormGroup>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set disabled(value) {
    		throw new Error("<FormGroup>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get id() {
    		throw new Error("<FormGroup>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set id(value) {
    		throw new Error("<FormGroup>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get tag() {
    		throw new Error("<FormGroup>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set tag(value) {
    		throw new Error("<FormGroup>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules\sveltestrap\src\Pagination.svelte generated by Svelte v3.21.0 */
    const file$6 = "node_modules\\sveltestrap\\src\\Pagination.svelte";

    function create_fragment$7(ctx) {
    	let nav;
    	let ul;
    	let current;
    	const default_slot_template = /*$$slots*/ ctx[9].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[8], null);

    	let nav_levels = [
    		/*props*/ ctx[3],
    		{ class: /*classes*/ ctx[1] },
    		{ "aria-label": /*ariaLabel*/ ctx[0] }
    	];

    	let nav_data = {};

    	for (let i = 0; i < nav_levels.length; i += 1) {
    		nav_data = assign(nav_data, nav_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			nav = element("nav");
    			ul = element("ul");
    			if (default_slot) default_slot.c();
    			attr_dev(ul, "class", /*listClasses*/ ctx[2]);
    			add_location(ul, file$6, 20, 2, 455);
    			set_attributes(nav, nav_data);
    			add_location(nav, file$6, 19, 0, 397);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, nav, anchor);
    			append_dev(nav, ul);

    			if (default_slot) {
    				default_slot.m(ul, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && dirty & /*$$scope*/ 256) {
    					default_slot.p(get_slot_context(default_slot_template, ctx, /*$$scope*/ ctx[8], null), get_slot_changes(default_slot_template, /*$$scope*/ ctx[8], dirty, null));
    				}
    			}

    			if (!current || dirty & /*listClasses*/ 4) {
    				attr_dev(ul, "class", /*listClasses*/ ctx[2]);
    			}

    			set_attributes(nav, get_spread_update(nav_levels, [
    				dirty & /*props*/ 8 && /*props*/ ctx[3],
    				dirty & /*classes*/ 2 && { class: /*classes*/ ctx[1] },
    				dirty & /*ariaLabel*/ 1 && { "aria-label": /*ariaLabel*/ ctx[0] }
    			]));
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(nav);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$7($$self, $$props, $$invalidate) {
    	let { class: className = "" } = $$props;
    	let { listClassName = "" } = $$props;
    	let { size = "" } = $$props;
    	let { ariaLabel = "pagination" } = $$props;
    	const props = clean($$props);
    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Pagination", $$slots, ['default']);

    	$$self.$set = $$new_props => {
    		$$invalidate(7, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    		if ("class" in $$new_props) $$invalidate(4, className = $$new_props.class);
    		if ("listClassName" in $$new_props) $$invalidate(5, listClassName = $$new_props.listClassName);
    		if ("size" in $$new_props) $$invalidate(6, size = $$new_props.size);
    		if ("ariaLabel" in $$new_props) $$invalidate(0, ariaLabel = $$new_props.ariaLabel);
    		if ("$$scope" in $$new_props) $$invalidate(8, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		clsx,
    		clean,
    		className,
    		listClassName,
    		size,
    		ariaLabel,
    		props,
    		classes,
    		listClasses
    	});

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(7, $$props = assign(assign({}, $$props), $$new_props));
    		if ("className" in $$props) $$invalidate(4, className = $$new_props.className);
    		if ("listClassName" in $$props) $$invalidate(5, listClassName = $$new_props.listClassName);
    		if ("size" in $$props) $$invalidate(6, size = $$new_props.size);
    		if ("ariaLabel" in $$props) $$invalidate(0, ariaLabel = $$new_props.ariaLabel);
    		if ("classes" in $$props) $$invalidate(1, classes = $$new_props.classes);
    		if ("listClasses" in $$props) $$invalidate(2, listClasses = $$new_props.listClasses);
    	};

    	let classes;
    	let listClasses;

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*className*/ 16) {
    			 $$invalidate(1, classes = clsx(className));
    		}

    		if ($$self.$$.dirty & /*listClassName, size*/ 96) {
    			 $$invalidate(2, listClasses = clsx(listClassName, "pagination", { [`pagination-${size}`]: !!size }));
    		}
    	};

    	$$props = exclude_internal_props($$props);

    	return [
    		ariaLabel,
    		classes,
    		listClasses,
    		props,
    		className,
    		listClassName,
    		size,
    		$$props,
    		$$scope,
    		$$slots
    	];
    }

    class Pagination extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$7, create_fragment$7, safe_not_equal, {
    			class: 4,
    			listClassName: 5,
    			size: 6,
    			ariaLabel: 0
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Pagination",
    			options,
    			id: create_fragment$7.name
    		});
    	}

    	get class() {
    		throw new Error("<Pagination>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<Pagination>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get listClassName() {
    		throw new Error("<Pagination>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set listClassName(value) {
    		throw new Error("<Pagination>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get size() {
    		throw new Error("<Pagination>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<Pagination>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get ariaLabel() {
    		throw new Error("<Pagination>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set ariaLabel(value) {
    		throw new Error("<Pagination>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules\sveltestrap\src\PaginationItem.svelte generated by Svelte v3.21.0 */
    const file$7 = "node_modules\\sveltestrap\\src\\PaginationItem.svelte";

    function create_fragment$8(ctx) {
    	let li;
    	let current;
    	const default_slot_template = /*$$slots*/ ctx[7].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[6], null);
    	let li_levels = [/*props*/ ctx[1], { class: /*classes*/ ctx[0] }];
    	let li_data = {};

    	for (let i = 0; i < li_levels.length; i += 1) {
    		li_data = assign(li_data, li_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			li = element("li");
    			if (default_slot) default_slot.c();
    			set_attributes(li, li_data);
    			add_location(li, file$7, 17, 0, 309);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);

    			if (default_slot) {
    				default_slot.m(li, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && dirty & /*$$scope*/ 64) {
    					default_slot.p(get_slot_context(default_slot_template, ctx, /*$$scope*/ ctx[6], null), get_slot_changes(default_slot_template, /*$$scope*/ ctx[6], dirty, null));
    				}
    			}

    			set_attributes(li, get_spread_update(li_levels, [
    				dirty & /*props*/ 2 && /*props*/ ctx[1],
    				dirty & /*classes*/ 1 && { class: /*classes*/ ctx[0] }
    			]));
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$8($$self, $$props, $$invalidate) {
    	let { class: className = "" } = $$props;
    	let { active = false } = $$props;
    	let { disabled = false } = $$props;
    	const props = clean($$props);
    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("PaginationItem", $$slots, ['default']);

    	$$self.$set = $$new_props => {
    		$$invalidate(5, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    		if ("class" in $$new_props) $$invalidate(2, className = $$new_props.class);
    		if ("active" in $$new_props) $$invalidate(3, active = $$new_props.active);
    		if ("disabled" in $$new_props) $$invalidate(4, disabled = $$new_props.disabled);
    		if ("$$scope" in $$new_props) $$invalidate(6, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		clsx,
    		clean,
    		className,
    		active,
    		disabled,
    		props,
    		classes
    	});

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(5, $$props = assign(assign({}, $$props), $$new_props));
    		if ("className" in $$props) $$invalidate(2, className = $$new_props.className);
    		if ("active" in $$props) $$invalidate(3, active = $$new_props.active);
    		if ("disabled" in $$props) $$invalidate(4, disabled = $$new_props.disabled);
    		if ("classes" in $$props) $$invalidate(0, classes = $$new_props.classes);
    	};

    	let classes;

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*className, active, disabled*/ 28) {
    			 $$invalidate(0, classes = clsx(className, "page-item", { active, disabled }));
    		}
    	};

    	$$props = exclude_internal_props($$props);
    	return [classes, props, className, active, disabled, $$props, $$scope, $$slots];
    }

    class PaginationItem extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$8, create_fragment$8, safe_not_equal, { class: 2, active: 3, disabled: 4 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "PaginationItem",
    			options,
    			id: create_fragment$8.name
    		});
    	}

    	get class() {
    		throw new Error("<PaginationItem>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<PaginationItem>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get active() {
    		throw new Error("<PaginationItem>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set active(value) {
    		throw new Error("<PaginationItem>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get disabled() {
    		throw new Error("<PaginationItem>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set disabled(value) {
    		throw new Error("<PaginationItem>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules\sveltestrap\src\PaginationLink.svelte generated by Svelte v3.21.0 */
    const file$8 = "node_modules\\sveltestrap\\src\\PaginationLink.svelte";

    // (50:2) {:else}
    function create_else_block$5(ctx) {
    	let current;
    	const default_slot_template = /*$$slots*/ ctx[14].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[13], null);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && dirty & /*$$scope*/ 8192) {
    					default_slot.p(get_slot_context(default_slot_template, ctx, /*$$scope*/ ctx[13], null), get_slot_changes(default_slot_template, /*$$scope*/ ctx[13], dirty, null));
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$5.name,
    		type: "else",
    		source: "(50:2) {:else}",
    		ctx
    	});

    	return block;
    }

    // (45:2) {#if previous || next || first || last}
    function create_if_block$5(ctx) {
    	let span0;
    	let t0;
    	let span1;
    	let t1;
    	let current;
    	const default_slot_template = /*$$slots*/ ctx[14].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[13], null);
    	const default_slot_or_fallback = default_slot || fallback_block$1(ctx);

    	const block = {
    		c: function create() {
    			span0 = element("span");
    			if (default_slot_or_fallback) default_slot_or_fallback.c();
    			t0 = space();
    			span1 = element("span");
    			t1 = text(/*realLabel*/ ctx[7]);
    			attr_dev(span0, "aria-hidden", "true");
    			add_location(span0, file$8, 45, 4, 995);
    			attr_dev(span1, "class", "sr-only");
    			add_location(span1, file$8, 48, 4, 1073);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span0, anchor);

    			if (default_slot_or_fallback) {
    				default_slot_or_fallback.m(span0, null);
    			}

    			insert_dev(target, t0, anchor);
    			insert_dev(target, span1, anchor);
    			append_dev(span1, t1);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && dirty & /*$$scope*/ 8192) {
    					default_slot.p(get_slot_context(default_slot_template, ctx, /*$$scope*/ ctx[13], null), get_slot_changes(default_slot_template, /*$$scope*/ ctx[13], dirty, null));
    				}
    			} else {
    				if (default_slot_or_fallback && default_slot_or_fallback.p && dirty & /*defaultCaret*/ 32) {
    					default_slot_or_fallback.p(ctx, dirty);
    				}
    			}

    			if (!current || dirty & /*realLabel*/ 128) set_data_dev(t1, /*realLabel*/ ctx[7]);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot_or_fallback, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot_or_fallback, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span0);
    			if (default_slot_or_fallback) default_slot_or_fallback.d(detaching);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(span1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$5.name,
    		type: "if",
    		source: "(45:2) {#if previous || next || first || last}",
    		ctx
    	});

    	return block;
    }

    // (47:12)  
    function fallback_block$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text(/*defaultCaret*/ ctx[5]);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*defaultCaret*/ 32) set_data_dev(t, /*defaultCaret*/ ctx[5]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: fallback_block$1.name,
    		type: "fallback",
    		source: "(47:12)  ",
    		ctx
    	});

    	return block;
    }

    function create_fragment$9(ctx) {
    	let a;
    	let current_block_type_index;
    	let if_block;
    	let current;
    	let dispose;
    	const if_block_creators = [create_if_block$5, create_else_block$5];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*previous*/ ctx[1] || /*next*/ ctx[0] || /*first*/ ctx[2] || /*last*/ ctx[3]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    	let a_levels = [/*props*/ ctx[8], { class: /*classes*/ ctx[6] }, { href: /*href*/ ctx[4] }];
    	let a_data = {};

    	for (let i = 0; i < a_levels.length; i += 1) {
    		a_data = assign(a_data, a_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			a = element("a");
    			if_block.c();
    			set_attributes(a, a_data);
    			add_location(a, file$8, 43, 0, 902);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor, remount) {
    			insert_dev(target, a, anchor);
    			if_blocks[current_block_type_index].m(a, null);
    			current = true;
    			if (remount) dispose();
    			dispose = listen_dev(a, "click", /*click_handler*/ ctx[15], false, false, false);
    		},
    		p: function update(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				}

    				transition_in(if_block, 1);
    				if_block.m(a, null);
    			}

    			set_attributes(a, get_spread_update(a_levels, [
    				dirty & /*props*/ 256 && /*props*/ ctx[8],
    				dirty & /*classes*/ 64 && { class: /*classes*/ ctx[6] },
    				dirty & /*href*/ 16 && { href: /*href*/ ctx[4] }
    			]));
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    			if_blocks[current_block_type_index].d();
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$9.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$9($$self, $$props, $$invalidate) {
    	let { class: className = "" } = $$props;
    	let { next = false } = $$props;
    	let { previous = false } = $$props;
    	let { first = false } = $$props;
    	let { last = false } = $$props;
    	let { ariaLabel = "" } = $$props;
    	let { href = "" } = $$props;
    	const props = clean($$props);
    	let defaultAriaLabel;
    	let defaultCaret;
    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("PaginationLink", $$slots, ['default']);

    	function click_handler(event) {
    		bubble($$self, event);
    	}

    	$$self.$set = $$new_props => {
    		$$invalidate(12, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    		if ("class" in $$new_props) $$invalidate(9, className = $$new_props.class);
    		if ("next" in $$new_props) $$invalidate(0, next = $$new_props.next);
    		if ("previous" in $$new_props) $$invalidate(1, previous = $$new_props.previous);
    		if ("first" in $$new_props) $$invalidate(2, first = $$new_props.first);
    		if ("last" in $$new_props) $$invalidate(3, last = $$new_props.last);
    		if ("ariaLabel" in $$new_props) $$invalidate(10, ariaLabel = $$new_props.ariaLabel);
    		if ("href" in $$new_props) $$invalidate(4, href = $$new_props.href);
    		if ("$$scope" in $$new_props) $$invalidate(13, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		clsx,
    		clean,
    		className,
    		next,
    		previous,
    		first,
    		last,
    		ariaLabel,
    		href,
    		props,
    		defaultAriaLabel,
    		defaultCaret,
    		classes,
    		realLabel
    	});

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(12, $$props = assign(assign({}, $$props), $$new_props));
    		if ("className" in $$props) $$invalidate(9, className = $$new_props.className);
    		if ("next" in $$props) $$invalidate(0, next = $$new_props.next);
    		if ("previous" in $$props) $$invalidate(1, previous = $$new_props.previous);
    		if ("first" in $$props) $$invalidate(2, first = $$new_props.first);
    		if ("last" in $$props) $$invalidate(3, last = $$new_props.last);
    		if ("ariaLabel" in $$props) $$invalidate(10, ariaLabel = $$new_props.ariaLabel);
    		if ("href" in $$props) $$invalidate(4, href = $$new_props.href);
    		if ("defaultAriaLabel" in $$props) $$invalidate(11, defaultAriaLabel = $$new_props.defaultAriaLabel);
    		if ("defaultCaret" in $$props) $$invalidate(5, defaultCaret = $$new_props.defaultCaret);
    		if ("classes" in $$props) $$invalidate(6, classes = $$new_props.classes);
    		if ("realLabel" in $$props) $$invalidate(7, realLabel = $$new_props.realLabel);
    	};

    	let classes;
    	let realLabel;

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*className*/ 512) {
    			 $$invalidate(6, classes = clsx(className, "page-link"));
    		}

    		if ($$self.$$.dirty & /*previous, next, first, last*/ 15) {
    			 if (previous) {
    				$$invalidate(11, defaultAriaLabel = "Previous");
    			} else if (next) {
    				$$invalidate(11, defaultAriaLabel = "Next");
    			} else if (first) {
    				$$invalidate(11, defaultAriaLabel = "First");
    			} else if (last) {
    				$$invalidate(11, defaultAriaLabel = "Last");
    			}
    		}

    		if ($$self.$$.dirty & /*ariaLabel, defaultAriaLabel*/ 3072) {
    			 $$invalidate(7, realLabel = ariaLabel || defaultAriaLabel);
    		}

    		if ($$self.$$.dirty & /*previous, next, first, last*/ 15) {
    			 if (previous) {
    				$$invalidate(5, defaultCaret = "‹");
    			} else if (next) {
    				$$invalidate(5, defaultCaret = "›");
    			} else if (first) {
    				$$invalidate(5, defaultCaret = "«");
    			} else if (last) {
    				$$invalidate(5, defaultCaret = "»");
    			}
    		}
    	};

    	$$props = exclude_internal_props($$props);

    	return [
    		next,
    		previous,
    		first,
    		last,
    		href,
    		defaultCaret,
    		classes,
    		realLabel,
    		props,
    		className,
    		ariaLabel,
    		defaultAriaLabel,
    		$$props,
    		$$scope,
    		$$slots,
    		click_handler
    	];
    }

    class PaginationLink extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$9, create_fragment$9, safe_not_equal, {
    			class: 9,
    			next: 0,
    			previous: 1,
    			first: 2,
    			last: 3,
    			ariaLabel: 10,
    			href: 4
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "PaginationLink",
    			options,
    			id: create_fragment$9.name
    		});
    	}

    	get class() {
    		throw new Error("<PaginationLink>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<PaginationLink>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get next() {
    		throw new Error("<PaginationLink>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set next(value) {
    		throw new Error("<PaginationLink>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get previous() {
    		throw new Error("<PaginationLink>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set previous(value) {
    		throw new Error("<PaginationLink>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get first() {
    		throw new Error("<PaginationLink>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set first(value) {
    		throw new Error("<PaginationLink>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get last() {
    		throw new Error("<PaginationLink>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set last(value) {
    		throw new Error("<PaginationLink>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get ariaLabel() {
    		throw new Error("<PaginationLink>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set ariaLabel(value) {
    		throw new Error("<PaginationLink>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get href() {
    		throw new Error("<PaginationLink>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set href(value) {
    		throw new Error("<PaginationLink>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\front\CoefGUI\CoefTable.svelte generated by Svelte v3.21.0 */

    const { console: console_1$2 } = globals;
    const file$9 = "src\\front\\CoefGUI\\CoefTable.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[7] = list[i];
    	return child_ctx;
    }

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[33] = list[i];
    	return child_ctx;
    }

    function get_each_context_2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[36] = list[i];
    	return child_ctx;
    }

    // (1:0) <script>   import {    onMount   }
    function create_catch_block(ctx) {
    	const block = {
    		c: noop,
    		m: noop,
    		p: noop,
    		i: noop,
    		o: noop,
    		d: noop
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_catch_block.name,
    		type: "catch",
    		source: "(1:0) <script>   import {    onMount   }",
    		ctx
    	});

    	return block;
    }

    // (326:1) {:then coef}
    function create_then_block(ctx) {
    	let t0;
    	let t1;
    	let t2;
    	let current;

    	const formgroup0 = new FormGroup({
    			props: {
    				$$slots: { default: [create_default_slot_19] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const formgroup1 = new FormGroup({
    			props: {
    				$$slots: { default: [create_default_slot_16] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const button = new Button({
    			props: {
    				outline: true,
    				color: "secondary",
    				class: "button-search",
    				$$slots: { default: [create_default_slot_15] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button.$on("click", function () {
    		if (is_function(/*search*/ ctx[12](/*currentTeam*/ ctx[3], /*currentYear*/ ctx[4]))) /*search*/ ctx[12](/*currentTeam*/ ctx[3], /*currentYear*/ ctx[4]).apply(this, arguments);
    	});

    	const table = new Table({
    			props: {
    				bordered: true,
    				$$slots: { default: [create_default_slot_12] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(formgroup0.$$.fragment);
    			t0 = space();
    			create_component(formgroup1.$$.fragment);
    			t1 = space();
    			create_component(button.$$.fragment);
    			t2 = space();
    			create_component(table.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(formgroup0, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(formgroup1, target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(button, target, anchor);
    			insert_dev(target, t2, anchor);
    			mount_component(table, target, anchor);
    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			const formgroup0_changes = {};

    			if (dirty[0] & /*currentTeam, teams*/ 10 | dirty[1] & /*$$scope*/ 256) {
    				formgroup0_changes.$$scope = { dirty, ctx };
    			}

    			formgroup0.$set(formgroup0_changes);
    			const formgroup1_changes = {};

    			if (dirty[0] & /*currentYear, years*/ 20 | dirty[1] & /*$$scope*/ 256) {
    				formgroup1_changes.$$scope = { dirty, ctx };
    			}

    			formgroup1.$set(formgroup1_changes);
    			const button_changes = {};

    			if (dirty[1] & /*$$scope*/ 256) {
    				button_changes.$$scope = { dirty, ctx };
    			}

    			button.$set(button_changes);
    			const table_changes = {};

    			if (dirty[0] & /*coef, newCoef*/ 129 | dirty[1] & /*$$scope*/ 256) {
    				table_changes.$$scope = { dirty, ctx };
    			}

    			table.$set(table_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(formgroup0.$$.fragment, local);
    			transition_in(formgroup1.$$.fragment, local);
    			transition_in(button.$$.fragment, local);
    			transition_in(table.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(formgroup0.$$.fragment, local);
    			transition_out(formgroup1.$$.fragment, local);
    			transition_out(button.$$.fragment, local);
    			transition_out(table.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(formgroup0, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(formgroup1, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(button, detaching);
    			if (detaching) detach_dev(t2);
    			destroy_component(table, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_then_block.name,
    		type: "then",
    		source: "(326:1) {:then coef}",
    		ctx
    	});

    	return block;
    }

    // (329:3) <Label for="selectTeam">
    function create_default_slot_21(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Búsqueda por equipo");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_21.name,
    		type: "slot",
    		source: "(329:3) <Label for=\\\"selectTeam\\\">",
    		ctx
    	});

    	return block;
    }

    // (331:4) {#each teams as team}
    function create_each_block_2(ctx) {
    	let option;
    	let t_value = /*team*/ ctx[36] + "";
    	let t;
    	let option_value_value;

    	const block = {
    		c: function create() {
    			option = element("option");
    			t = text(t_value);
    			option.__value = option_value_value = /*team*/ ctx[36];
    			option.value = option.__value;
    			add_location(option, file$9, 331, 4, 8434);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, option, anchor);
    			append_dev(option, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*teams*/ 2 && t_value !== (t_value = /*team*/ ctx[36] + "")) set_data_dev(t, t_value);

    			if (dirty[0] & /*teams*/ 2 && option_value_value !== (option_value_value = /*team*/ ctx[36])) {
    				prop_dev(option, "__value", option_value_value);
    			}

    			option.value = option.__value;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(option);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_2.name,
    		type: "each",
    		source: "(331:4) {#each teams as team}",
    		ctx
    	});

    	return block;
    }

    // (330:3) <Input type="select" name="selectTeam" id="selectTeam" bind:value="{currentTeam}">
    function create_default_slot_20(ctx) {
    	let t0;
    	let option;
    	let each_value_2 = /*teams*/ ctx[1];
    	validate_each_argument(each_value_2);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_2.length; i += 1) {
    		each_blocks[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
    	}

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t0 = space();
    			option = element("option");
    			option.textContent = "-";
    			option.__value = "-";
    			option.value = option.__value;
    			add_location(option, file$9, 333, 4, 8476);
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, t0, anchor);
    			insert_dev(target, option, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*teams*/ 2) {
    				each_value_2 = /*teams*/ ctx[1];
    				validate_each_argument(each_value_2);
    				let i;

    				for (i = 0; i < each_value_2.length; i += 1) {
    					const child_ctx = get_each_context_2(ctx, each_value_2, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_2(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(t0.parentNode, t0);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value_2.length;
    			}
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(option);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_20.name,
    		type: "slot",
    		source: "(330:3) <Input type=\\\"select\\\" name=\\\"selectTeam\\\" id=\\\"selectTeam\\\" bind:value=\\\"{currentTeam}\\\">",
    		ctx
    	});

    	return block;
    }

    // (328:2) <FormGroup>
    function create_default_slot_19(ctx) {
    	let t;
    	let updating_value;
    	let current;

    	const label = new Label({
    			props: {
    				for: "selectTeam",
    				$$slots: { default: [create_default_slot_21] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	function input_value_binding(value) {
    		/*input_value_binding*/ ctx[19].call(null, value);
    	}

    	let input_props = {
    		type: "select",
    		name: "selectTeam",
    		id: "selectTeam",
    		$$slots: { default: [create_default_slot_20] },
    		$$scope: { ctx }
    	};

    	if (/*currentTeam*/ ctx[3] !== void 0) {
    		input_props.value = /*currentTeam*/ ctx[3];
    	}

    	const input = new Input({ props: input_props, $$inline: true });
    	binding_callbacks.push(() => bind(input, "value", input_value_binding));

    	const block = {
    		c: function create() {
    			create_component(label.$$.fragment);
    			t = space();
    			create_component(input.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(label, target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(input, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const label_changes = {};

    			if (dirty[1] & /*$$scope*/ 256) {
    				label_changes.$$scope = { dirty, ctx };
    			}

    			label.$set(label_changes);
    			const input_changes = {};

    			if (dirty[0] & /*teams*/ 2 | dirty[1] & /*$$scope*/ 256) {
    				input_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_value && dirty[0] & /*currentTeam*/ 8) {
    				updating_value = true;
    				input_changes.value = /*currentTeam*/ ctx[3];
    				add_flush_callback(() => updating_value = false);
    			}

    			input.$set(input_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(label.$$.fragment, local);
    			transition_in(input.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(label.$$.fragment, local);
    			transition_out(input.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(label, detaching);
    			if (detaching) detach_dev(t);
    			destroy_component(input, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_19.name,
    		type: "slot",
    		source: "(328:2) <FormGroup>",
    		ctx
    	});

    	return block;
    }

    // (339:3) <Label for="selectYear">
    function create_default_slot_18(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Año");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_18.name,
    		type: "slot",
    		source: "(339:3) <Label for=\\\"selectYear\\\">",
    		ctx
    	});

    	return block;
    }

    // (341:4) {#each years as year}
    function create_each_block_1(ctx) {
    	let option;
    	let t_value = /*year*/ ctx[33] + "";
    	let t;
    	let option_value_value;

    	const block = {
    		c: function create() {
    			option = element("option");
    			t = text(t_value);
    			option.__value = option_value_value = /*year*/ ctx[33];
    			option.value = option.__value;
    			add_location(option, file$9, 341, 4, 8707);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, option, anchor);
    			append_dev(option, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*years*/ 4 && t_value !== (t_value = /*year*/ ctx[33] + "")) set_data_dev(t, t_value);

    			if (dirty[0] & /*years*/ 4 && option_value_value !== (option_value_value = /*year*/ ctx[33])) {
    				prop_dev(option, "__value", option_value_value);
    			}

    			option.value = option.__value;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(option);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1.name,
    		type: "each",
    		source: "(341:4) {#each years as year}",
    		ctx
    	});

    	return block;
    }

    // (340:3) <Input type="select"  name="selectYear" id="selectYear" bind:value="{currentYear}">
    function create_default_slot_17(ctx) {
    	let t0;
    	let option;
    	let each_value_1 = /*years*/ ctx[2];
    	validate_each_argument(each_value_1);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
    	}

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t0 = space();
    			option = element("option");
    			option.textContent = "-";
    			option.__value = "-";
    			option.value = option.__value;
    			add_location(option, file$9, 343, 4, 8749);
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, t0, anchor);
    			insert_dev(target, option, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*years*/ 4) {
    				each_value_1 = /*years*/ ctx[2];
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(t0.parentNode, t0);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value_1.length;
    			}
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(option);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_17.name,
    		type: "slot",
    		source: "(340:3) <Input type=\\\"select\\\"  name=\\\"selectYear\\\" id=\\\"selectYear\\\" bind:value=\\\"{currentYear}\\\">",
    		ctx
    	});

    	return block;
    }

    // (338:2) <FormGroup>
    function create_default_slot_16(ctx) {
    	let t;
    	let updating_value;
    	let current;

    	const label = new Label({
    			props: {
    				for: "selectYear",
    				$$slots: { default: [create_default_slot_18] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	function input_value_binding_1(value) {
    		/*input_value_binding_1*/ ctx[20].call(null, value);
    	}

    	let input_props = {
    		type: "select",
    		name: "selectYear",
    		id: "selectYear",
    		$$slots: { default: [create_default_slot_17] },
    		$$scope: { ctx }
    	};

    	if (/*currentYear*/ ctx[4] !== void 0) {
    		input_props.value = /*currentYear*/ ctx[4];
    	}

    	const input = new Input({ props: input_props, $$inline: true });
    	binding_callbacks.push(() => bind(input, "value", input_value_binding_1));

    	const block = {
    		c: function create() {
    			create_component(label.$$.fragment);
    			t = space();
    			create_component(input.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(label, target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(input, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const label_changes = {};

    			if (dirty[1] & /*$$scope*/ 256) {
    				label_changes.$$scope = { dirty, ctx };
    			}

    			label.$set(label_changes);
    			const input_changes = {};

    			if (dirty[0] & /*years*/ 4 | dirty[1] & /*$$scope*/ 256) {
    				input_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_value && dirty[0] & /*currentYear*/ 16) {
    				updating_value = true;
    				input_changes.value = /*currentYear*/ ctx[4];
    				add_flush_callback(() => updating_value = false);
    			}

    			input.$set(input_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(label.$$.fragment, local);
    			transition_in(input.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(label.$$.fragment, local);
    			transition_out(input.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(label, detaching);
    			if (detaching) detach_dev(t);
    			destroy_component(input, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_16.name,
    		type: "slot",
    		source: "(338:2) <FormGroup>",
    		ctx
    	});

    	return block;
    }

    // (348:2) <Button outline color="secondary" on:click="{search(currentTeam, currentYear)}" class="button-search" >
    function create_default_slot_15(ctx) {
    	let i;
    	let t;

    	const block = {
    		c: function create() {
    			i = element("i");
    			t = text(" Buscar");
    			attr_dev(i, "class", "fas fa-search");
    			add_location(i, file$9, 347, 106, 8906);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, i, anchor);
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(i);
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_15.name,
    		type: "slot",
    		source: "(348:2) <Button outline color=\\\"secondary\\\" on:click=\\\"{search(currentTeam, currentYear)}\\\" class=\\\"button-search\\\" >",
    		ctx
    	});

    	return block;
    }

    // (372:10) <Button outline  color="primary" on:click={insertCoef}>
    function create_default_slot_14(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Insertar");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_14.name,
    		type: "slot",
    		source: "(372:10) <Button outline  color=\\\"primary\\\" on:click={insertCoef}>",
    		ctx
    	});

    	return block;
    }

    // (384:10) <Button outline color="danger" on:click="{deleteCoef(coef.team,coef.year)}" on:click={deleteAlert}>
    function create_default_slot_13(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Eliminar");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_13.name,
    		type: "slot",
    		source: "(384:10) <Button outline color=\\\"danger\\\" on:click=\\\"{deleteCoef(coef.team,coef.year)}\\\" on:click={deleteAlert}>",
    		ctx
    	});

    	return block;
    }

    // (374:4) {#each coef as coef}
    function create_each_block(ctx) {
    	let tr;
    	let td0;
    	let t0_value = /*coef*/ ctx[7].country + "";
    	let t0;
    	let t1;
    	let td1;
    	let t2_value = /*coef*/ ctx[7].year + "";
    	let t2;
    	let t3;
    	let td2;
    	let a;
    	let t4_value = /*coef*/ ctx[7].team + "";
    	let t4;
    	let a_href_value;
    	let t5;
    	let td3;
    	let t6_value = /*coef*/ ctx[7].coefficient + "";
    	let t6;
    	let t7;
    	let td4;
    	let t8_value = /*coef*/ ctx[7].fed + "";
    	let t8;
    	let t9;
    	let td5;
    	let t10_value = /*coef*/ ctx[7].classification + "";
    	let t10;
    	let t11;
    	let td6;
    	let t12;
    	let current;

    	const button = new Button({
    			props: {
    				outline: true,
    				color: "danger",
    				$$slots: { default: [create_default_slot_13] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button.$on("click", function () {
    		if (is_function(/*deleteCoef*/ ctx[10](/*coef*/ ctx[7].team, /*coef*/ ctx[7].year))) /*deleteCoef*/ ctx[10](/*coef*/ ctx[7].team, /*coef*/ ctx[7].year).apply(this, arguments);
    	});

    	button.$on("click", deleteAlert);

    	const block = {
    		c: function create() {
    			tr = element("tr");
    			td0 = element("td");
    			t0 = text(t0_value);
    			t1 = space();
    			td1 = element("td");
    			t2 = text(t2_value);
    			t3 = space();
    			td2 = element("td");
    			a = element("a");
    			t4 = text(t4_value);
    			t5 = space();
    			td3 = element("td");
    			t6 = text(t6_value);
    			t7 = space();
    			td4 = element("td");
    			t8 = text(t8_value);
    			t9 = space();
    			td5 = element("td");
    			t10 = text(t10_value);
    			t11 = space();
    			td6 = element("td");
    			create_component(button.$$.fragment);
    			t12 = space();
    			add_location(td0, file$9, 375, 6, 9735);
    			add_location(td1, file$9, 376, 6, 9766);
    			attr_dev(a, "href", a_href_value = "#/global-coef/" + /*coef*/ ctx[7].team + "/" + /*coef*/ ctx[7].year);
    			add_location(a, file$9, 378, 7, 9807);
    			add_location(td2, file$9, 377, 6, 9794);
    			add_location(td3, file$9, 380, 6, 9891);
    			add_location(td4, file$9, 381, 6, 9926);
    			add_location(td5, file$9, 382, 6, 9953);
    			add_location(td6, file$9, 383, 6, 9991);
    			add_location(tr, file$9, 374, 5, 9723);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, tr, anchor);
    			append_dev(tr, td0);
    			append_dev(td0, t0);
    			append_dev(tr, t1);
    			append_dev(tr, td1);
    			append_dev(td1, t2);
    			append_dev(tr, t3);
    			append_dev(tr, td2);
    			append_dev(td2, a);
    			append_dev(a, t4);
    			append_dev(tr, t5);
    			append_dev(tr, td3);
    			append_dev(td3, t6);
    			append_dev(tr, t7);
    			append_dev(tr, td4);
    			append_dev(td4, t8);
    			append_dev(tr, t9);
    			append_dev(tr, td5);
    			append_dev(td5, t10);
    			append_dev(tr, t11);
    			append_dev(tr, td6);
    			mount_component(button, td6, null);
    			append_dev(tr, t12);
    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			if ((!current || dirty[0] & /*coef*/ 128) && t0_value !== (t0_value = /*coef*/ ctx[7].country + "")) set_data_dev(t0, t0_value);
    			if ((!current || dirty[0] & /*coef*/ 128) && t2_value !== (t2_value = /*coef*/ ctx[7].year + "")) set_data_dev(t2, t2_value);
    			if ((!current || dirty[0] & /*coef*/ 128) && t4_value !== (t4_value = /*coef*/ ctx[7].team + "")) set_data_dev(t4, t4_value);

    			if (!current || dirty[0] & /*coef*/ 128 && a_href_value !== (a_href_value = "#/global-coef/" + /*coef*/ ctx[7].team + "/" + /*coef*/ ctx[7].year)) {
    				attr_dev(a, "href", a_href_value);
    			}

    			if ((!current || dirty[0] & /*coef*/ 128) && t6_value !== (t6_value = /*coef*/ ctx[7].coefficient + "")) set_data_dev(t6, t6_value);
    			if ((!current || dirty[0] & /*coef*/ 128) && t8_value !== (t8_value = /*coef*/ ctx[7].fed + "")) set_data_dev(t8, t8_value);
    			if ((!current || dirty[0] & /*coef*/ 128) && t10_value !== (t10_value = /*coef*/ ctx[7].classification + "")) set_data_dev(t10, t10_value);
    			const button_changes = {};

    			if (dirty[1] & /*$$scope*/ 256) {
    				button_changes.$$scope = { dirty, ctx };
    			}

    			button.$set(button_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(button.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(button.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(tr);
    			destroy_component(button);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(374:4) {#each coef as coef}",
    		ctx
    	});

    	return block;
    }

    // (351:2) <Table bordered >
    function create_default_slot_12(ctx) {
    	let thead;
    	let tr0;
    	let th0;
    	let t1;
    	let th1;
    	let t3;
    	let th2;
    	let t5;
    	let th3;
    	let t7;
    	let th4;
    	let t9;
    	let th5;
    	let t11;
    	let th6;
    	let t13;
    	let tbody;
    	let tr1;
    	let td0;
    	let input0;
    	let t14;
    	let td1;
    	let input1;
    	let t15;
    	let td2;
    	let input2;
    	let t16;
    	let td3;
    	let input3;
    	let t17;
    	let td4;
    	let input4;
    	let t18;
    	let td5;
    	let input5;
    	let t19;
    	let td6;
    	let t20;
    	let current;
    	let dispose;

    	const button = new Button({
    			props: {
    				outline: true,
    				color: "primary",
    				$$slots: { default: [create_default_slot_14] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button.$on("click", /*insertCoef*/ ctx[9]);
    	let each_value = /*coef*/ ctx[7];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			thead = element("thead");
    			tr0 = element("tr");
    			th0 = element("th");
    			th0.textContent = "País";
    			t1 = space();
    			th1 = element("th");
    			th1.textContent = "Año";
    			t3 = space();
    			th2 = element("th");
    			th2.textContent = "Equipo";
    			t5 = space();
    			th3 = element("th");
    			th3.textContent = "Coeficiente";
    			t7 = space();
    			th4 = element("th");
    			th4.textContent = "Fed";
    			t9 = space();
    			th5 = element("th");
    			th5.textContent = "Clasificación";
    			t11 = space();
    			th6 = element("th");
    			th6.textContent = "Acciones";
    			t13 = space();
    			tbody = element("tbody");
    			tr1 = element("tr");
    			td0 = element("td");
    			input0 = element("input");
    			t14 = space();
    			td1 = element("td");
    			input1 = element("input");
    			t15 = space();
    			td2 = element("td");
    			input2 = element("input");
    			t16 = space();
    			td3 = element("td");
    			input3 = element("input");
    			t17 = space();
    			td4 = element("td");
    			input4 = element("input");
    			t18 = space();
    			td5 = element("td");
    			input5 = element("input");
    			t19 = space();
    			td6 = element("td");
    			create_component(button.$$.fragment);
    			t20 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			add_location(th0, file$9, 353, 5, 9007);
    			add_location(th1, file$9, 354, 5, 9027);
    			add_location(th2, file$9, 355, 5, 9046);
    			add_location(th3, file$9, 356, 5, 9068);
    			add_location(th4, file$9, 357, 5, 9095);
    			add_location(th5, file$9, 358, 5, 9114);
    			add_location(th6, file$9, 359, 5, 9143);
    			add_location(tr0, file$9, 352, 4, 8996);
    			add_location(thead, file$9, 351, 3, 8983);
    			add_location(input0, file$9, 365, 9, 9219);
    			add_location(td0, file$9, 365, 5, 9215);
    			attr_dev(input1, "type", "number");
    			add_location(input1, file$9, 366, 9, 9273);
    			add_location(td1, file$9, 366, 5, 9269);
    			add_location(input2, file$9, 367, 9, 9338);
    			add_location(td2, file$9, 367, 5, 9334);
    			attr_dev(input3, "type", "number");
    			add_location(input3, file$9, 368, 9, 9389);
    			add_location(td3, file$9, 368, 5, 9385);
    			attr_dev(input4, "type", "number");
    			add_location(input4, file$9, 369, 9, 9461);
    			add_location(td4, file$9, 369, 5, 9457);
    			attr_dev(input5, "type", "number");
    			add_location(input5, file$9, 370, 9, 9525);
    			add_location(td5, file$9, 370, 5, 9521);
    			add_location(td6, file$9, 371, 5, 9596);
    			add_location(tr1, file$9, 364, 4, 9204);
    			add_location(tbody, file$9, 363, 3, 9191);
    		},
    		m: function mount(target, anchor, remount) {
    			insert_dev(target, thead, anchor);
    			append_dev(thead, tr0);
    			append_dev(tr0, th0);
    			append_dev(tr0, t1);
    			append_dev(tr0, th1);
    			append_dev(tr0, t3);
    			append_dev(tr0, th2);
    			append_dev(tr0, t5);
    			append_dev(tr0, th3);
    			append_dev(tr0, t7);
    			append_dev(tr0, th4);
    			append_dev(tr0, t9);
    			append_dev(tr0, th5);
    			append_dev(tr0, t11);
    			append_dev(tr0, th6);
    			insert_dev(target, t13, anchor);
    			insert_dev(target, tbody, anchor);
    			append_dev(tbody, tr1);
    			append_dev(tr1, td0);
    			append_dev(td0, input0);
    			set_input_value(input0, /*newCoef*/ ctx[0].country);
    			append_dev(tr1, t14);
    			append_dev(tr1, td1);
    			append_dev(td1, input1);
    			set_input_value(input1, /*newCoef*/ ctx[0].year);
    			append_dev(tr1, t15);
    			append_dev(tr1, td2);
    			append_dev(td2, input2);
    			set_input_value(input2, /*newCoef*/ ctx[0].team);
    			append_dev(tr1, t16);
    			append_dev(tr1, td3);
    			append_dev(td3, input3);
    			set_input_value(input3, /*newCoef*/ ctx[0].coefficient);
    			append_dev(tr1, t17);
    			append_dev(tr1, td4);
    			append_dev(td4, input4);
    			set_input_value(input4, /*newCoef*/ ctx[0].fed);
    			append_dev(tr1, t18);
    			append_dev(tr1, td5);
    			append_dev(td5, input5);
    			set_input_value(input5, /*newCoef*/ ctx[0].classification);
    			append_dev(tr1, t19);
    			append_dev(tr1, td6);
    			mount_component(button, td6, null);
    			append_dev(tbody, t20);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(tbody, null);
    			}

    			current = true;
    			if (remount) run_all(dispose);

    			dispose = [
    				listen_dev(input0, "input", /*input0_input_handler*/ ctx[21]),
    				listen_dev(input1, "input", /*input1_input_handler*/ ctx[22]),
    				listen_dev(input2, "input", /*input2_input_handler*/ ctx[23]),
    				listen_dev(input3, "input", /*input3_input_handler*/ ctx[24]),
    				listen_dev(input4, "input", /*input4_input_handler*/ ctx[25]),
    				listen_dev(input5, "input", /*input5_input_handler*/ ctx[26])
    			];
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*newCoef*/ 1 && input0.value !== /*newCoef*/ ctx[0].country) {
    				set_input_value(input0, /*newCoef*/ ctx[0].country);
    			}

    			if (dirty[0] & /*newCoef*/ 1 && to_number(input1.value) !== /*newCoef*/ ctx[0].year) {
    				set_input_value(input1, /*newCoef*/ ctx[0].year);
    			}

    			if (dirty[0] & /*newCoef*/ 1 && input2.value !== /*newCoef*/ ctx[0].team) {
    				set_input_value(input2, /*newCoef*/ ctx[0].team);
    			}

    			if (dirty[0] & /*newCoef*/ 1 && to_number(input3.value) !== /*newCoef*/ ctx[0].coefficient) {
    				set_input_value(input3, /*newCoef*/ ctx[0].coefficient);
    			}

    			if (dirty[0] & /*newCoef*/ 1 && to_number(input4.value) !== /*newCoef*/ ctx[0].fed) {
    				set_input_value(input4, /*newCoef*/ ctx[0].fed);
    			}

    			if (dirty[0] & /*newCoef*/ 1 && to_number(input5.value) !== /*newCoef*/ ctx[0].classification) {
    				set_input_value(input5, /*newCoef*/ ctx[0].classification);
    			}

    			const button_changes = {};

    			if (dirty[1] & /*$$scope*/ 256) {
    				button_changes.$$scope = { dirty, ctx };
    			}

    			button.$set(button_changes);

    			if (dirty[0] & /*deleteCoef, coef*/ 1152) {
    				each_value = /*coef*/ ctx[7];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(tbody, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(button.$$.fragment, local);

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(button.$$.fragment, local);
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(thead);
    			if (detaching) detach_dev(t13);
    			if (detaching) detach_dev(tbody);
    			destroy_component(button);
    			destroy_each(each_blocks, detaching);
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_12.name,
    		type: "slot",
    		source: "(351:2) <Table bordered >",
    		ctx
    	});

    	return block;
    }

    // (324:14)     Loading coef...   {:then coef}
    function create_pending_block(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Loading coef...");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_pending_block.name,
    		type: "pending",
    		source: "(324:14)     Loading coef...   {:then coef}",
    		ctx
    	});

    	return block;
    }

    // (394:2) <PaginationItem class="{currentPage === 1 ? 'disabled' : ''}">
    function create_default_slot_11(ctx) {
    	let current;

    	const paginationlink = new PaginationLink({
    			props: { previous: true, href: "#/globalCoefAPI" },
    			$$inline: true
    		});

    	paginationlink.$on("click", /*click_handler*/ ctx[27]);

    	const block = {
    		c: function create() {
    			create_component(paginationlink.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(paginationlink, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(paginationlink.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(paginationlink.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(paginationlink, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_11.name,
    		type: "slot",
    		source: "(394:2) <PaginationItem class=\\\"{currentPage === 1 ? 'disabled' : ''}\\\">",
    		ctx
    	});

    	return block;
    }

    // (399:2) {#if currentPage != 1}
    function create_if_block_1$2(ctx) {
    	let current;

    	const paginationitem = new PaginationItem({
    			props: {
    				$$slots: { default: [create_default_slot_9] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(paginationitem.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(paginationitem, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const paginationitem_changes = {};

    			if (dirty[0] & /*currentPage*/ 32 | dirty[1] & /*$$scope*/ 256) {
    				paginationitem_changes.$$scope = { dirty, ctx };
    			}

    			paginationitem.$set(paginationitem_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(paginationitem.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(paginationitem.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(paginationitem, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$2.name,
    		type: "if",
    		source: "(399:2) {#if currentPage != 1}",
    		ctx
    	});

    	return block;
    }

    // (401:3) <PaginationLink href="#/globalCoefAPI" on:click="{() => addOffset(-1)}" >
    function create_default_slot_10(ctx) {
    	let t_value = /*currentPage*/ ctx[5] - 1 + "";
    	let t;

    	const block = {
    		c: function create() {
    			t = text(t_value);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*currentPage*/ 32 && t_value !== (t_value = /*currentPage*/ ctx[5] - 1 + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_10.name,
    		type: "slot",
    		source: "(401:3) <PaginationLink href=\\\"#/globalCoefAPI\\\" on:click=\\\"{() => addOffset(-1)}\\\" >",
    		ctx
    	});

    	return block;
    }

    // (400:2) <PaginationItem>
    function create_default_slot_9(ctx) {
    	let current;

    	const paginationlink = new PaginationLink({
    			props: {
    				href: "#/globalCoefAPI",
    				$$slots: { default: [create_default_slot_10] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	paginationlink.$on("click", /*click_handler_1*/ ctx[28]);

    	const block = {
    		c: function create() {
    			create_component(paginationlink.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(paginationlink, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const paginationlink_changes = {};

    			if (dirty[0] & /*currentPage*/ 32 | dirty[1] & /*$$scope*/ 256) {
    				paginationlink_changes.$$scope = { dirty, ctx };
    			}

    			paginationlink.$set(paginationlink_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(paginationlink.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(paginationlink.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(paginationlink, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_9.name,
    		type: "slot",
    		source: "(400:2) <PaginationItem>",
    		ctx
    	});

    	return block;
    }

    // (405:3) <PaginationLink href="#/globalCoefAPI" >
    function create_default_slot_8(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text(/*currentPage*/ ctx[5]);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*currentPage*/ 32) set_data_dev(t, /*currentPage*/ ctx[5]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_8.name,
    		type: "slot",
    		source: "(405:3) <PaginationLink href=\\\"#/globalCoefAPI\\\" >",
    		ctx
    	});

    	return block;
    }

    // (404:2) <PaginationItem active>
    function create_default_slot_7(ctx) {
    	let current;

    	const paginationlink = new PaginationLink({
    			props: {
    				href: "#/globalCoefAPI",
    				$$slots: { default: [create_default_slot_8] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(paginationlink.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(paginationlink, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const paginationlink_changes = {};

    			if (dirty[0] & /*currentPage*/ 32 | dirty[1] & /*$$scope*/ 256) {
    				paginationlink_changes.$$scope = { dirty, ctx };
    			}

    			paginationlink.$set(paginationlink_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(paginationlink.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(paginationlink.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(paginationlink, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_7.name,
    		type: "slot",
    		source: "(404:2) <PaginationItem active>",
    		ctx
    	});

    	return block;
    }

    // (409:2) {#if moreData}
    function create_if_block$6(ctx) {
    	let current;

    	const paginationitem = new PaginationItem({
    			props: {
    				$$slots: { default: [create_default_slot_5] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(paginationitem.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(paginationitem, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const paginationitem_changes = {};

    			if (dirty[0] & /*currentPage*/ 32 | dirty[1] & /*$$scope*/ 256) {
    				paginationitem_changes.$$scope = { dirty, ctx };
    			}

    			paginationitem.$set(paginationitem_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(paginationitem.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(paginationitem.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(paginationitem, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$6.name,
    		type: "if",
    		source: "(409:2) {#if moreData}",
    		ctx
    	});

    	return block;
    }

    // (411:3) <PaginationLink href="#/globalCoefAPI" on:click="{() => addOffset(1)}">
    function create_default_slot_6(ctx) {
    	let t_value = /*currentPage*/ ctx[5] + 1 + "";
    	let t;

    	const block = {
    		c: function create() {
    			t = text(t_value);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*currentPage*/ 32 && t_value !== (t_value = /*currentPage*/ ctx[5] + 1 + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_6.name,
    		type: "slot",
    		source: "(411:3) <PaginationLink href=\\\"#/globalCoefAPI\\\" on:click=\\\"{() => addOffset(1)}\\\">",
    		ctx
    	});

    	return block;
    }

    // (410:2) <PaginationItem >
    function create_default_slot_5(ctx) {
    	let current;

    	const paginationlink = new PaginationLink({
    			props: {
    				href: "#/globalCoefAPI",
    				$$slots: { default: [create_default_slot_6] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	paginationlink.$on("click", /*click_handler_2*/ ctx[29]);

    	const block = {
    		c: function create() {
    			create_component(paginationlink.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(paginationlink, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const paginationlink_changes = {};

    			if (dirty[0] & /*currentPage*/ 32 | dirty[1] & /*$$scope*/ 256) {
    				paginationlink_changes.$$scope = { dirty, ctx };
    			}

    			paginationlink.$set(paginationlink_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(paginationlink.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(paginationlink.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(paginationlink, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_5.name,
    		type: "slot",
    		source: "(410:2) <PaginationItem >",
    		ctx
    	});

    	return block;
    }

    // (415:2) <PaginationItem class="{moreData ? '' : 'disabled'}">
    function create_default_slot_4(ctx) {
    	let current;

    	const paginationlink = new PaginationLink({
    			props: { next: true, href: "#/globalCoefAPI" },
    			$$inline: true
    		});

    	paginationlink.$on("click", /*click_handler_3*/ ctx[30]);

    	const block = {
    		c: function create() {
    			create_component(paginationlink.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(paginationlink, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(paginationlink.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(paginationlink.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(paginationlink, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_4.name,
    		type: "slot",
    		source: "(415:2) <PaginationItem class=\\\"{moreData ? '' : 'disabled'}\\\">",
    		ctx
    	});

    	return block;
    }

    // (391:1) <Pagination style="float:right;" ariaLabel="Cambiar de página">
    function create_default_slot_3(ctx) {
    	let t0;
    	let t1;
    	let t2;
    	let t3;
    	let current;

    	const paginationitem0 = new PaginationItem({
    			props: {
    				class: /*currentPage*/ ctx[5] === 1 ? "disabled" : "",
    				$$slots: { default: [create_default_slot_11] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	let if_block0 = /*currentPage*/ ctx[5] != 1 && create_if_block_1$2(ctx);

    	const paginationitem1 = new PaginationItem({
    			props: {
    				active: true,
    				$$slots: { default: [create_default_slot_7] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	let if_block1 = /*moreData*/ ctx[6] && create_if_block$6(ctx);

    	const paginationitem2 = new PaginationItem({
    			props: {
    				class: /*moreData*/ ctx[6] ? "" : "disabled",
    				$$slots: { default: [create_default_slot_4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(paginationitem0.$$.fragment);
    			t0 = space();
    			if (if_block0) if_block0.c();
    			t1 = space();
    			create_component(paginationitem1.$$.fragment);
    			t2 = space();
    			if (if_block1) if_block1.c();
    			t3 = space();
    			create_component(paginationitem2.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(paginationitem0, target, anchor);
    			insert_dev(target, t0, anchor);
    			if (if_block0) if_block0.m(target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(paginationitem1, target, anchor);
    			insert_dev(target, t2, anchor);
    			if (if_block1) if_block1.m(target, anchor);
    			insert_dev(target, t3, anchor);
    			mount_component(paginationitem2, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const paginationitem0_changes = {};
    			if (dirty[0] & /*currentPage*/ 32) paginationitem0_changes.class = /*currentPage*/ ctx[5] === 1 ? "disabled" : "";

    			if (dirty[1] & /*$$scope*/ 256) {
    				paginationitem0_changes.$$scope = { dirty, ctx };
    			}

    			paginationitem0.$set(paginationitem0_changes);

    			if (/*currentPage*/ ctx[5] != 1) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);

    					if (dirty[0] & /*currentPage*/ 32) {
    						transition_in(if_block0, 1);
    					}
    				} else {
    					if_block0 = create_if_block_1$2(ctx);
    					if_block0.c();
    					transition_in(if_block0, 1);
    					if_block0.m(t1.parentNode, t1);
    				}
    			} else if (if_block0) {
    				group_outros();

    				transition_out(if_block0, 1, 1, () => {
    					if_block0 = null;
    				});

    				check_outros();
    			}

    			const paginationitem1_changes = {};

    			if (dirty[0] & /*currentPage*/ 32 | dirty[1] & /*$$scope*/ 256) {
    				paginationitem1_changes.$$scope = { dirty, ctx };
    			}

    			paginationitem1.$set(paginationitem1_changes);

    			if (/*moreData*/ ctx[6]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);

    					if (dirty[0] & /*moreData*/ 64) {
    						transition_in(if_block1, 1);
    					}
    				} else {
    					if_block1 = create_if_block$6(ctx);
    					if_block1.c();
    					transition_in(if_block1, 1);
    					if_block1.m(t3.parentNode, t3);
    				}
    			} else if (if_block1) {
    				group_outros();

    				transition_out(if_block1, 1, 1, () => {
    					if_block1 = null;
    				});

    				check_outros();
    			}

    			const paginationitem2_changes = {};
    			if (dirty[0] & /*moreData*/ 64) paginationitem2_changes.class = /*moreData*/ ctx[6] ? "" : "disabled";

    			if (dirty[1] & /*$$scope*/ 256) {
    				paginationitem2_changes.$$scope = { dirty, ctx };
    			}

    			paginationitem2.$set(paginationitem2_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(paginationitem0.$$.fragment, local);
    			transition_in(if_block0);
    			transition_in(paginationitem1.$$.fragment, local);
    			transition_in(if_block1);
    			transition_in(paginationitem2.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(paginationitem0.$$.fragment, local);
    			transition_out(if_block0);
    			transition_out(paginationitem1.$$.fragment, local);
    			transition_out(if_block1);
    			transition_out(paginationitem2.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(paginationitem0, detaching);
    			if (detaching) detach_dev(t0);
    			if (if_block0) if_block0.d(detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(paginationitem1, detaching);
    			if (detaching) detach_dev(t2);
    			if (if_block1) if_block1.d(detaching);
    			if (detaching) detach_dev(t3);
    			destroy_component(paginationitem2, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3.name,
    		type: "slot",
    		source: "(391:1) <Pagination style=\\\"float:right;\\\" ariaLabel=\\\"Cambiar de página\\\">",
    		ctx
    	});

    	return block;
    }

    // (421:1) <Button outline color="secondary" on:click="{pop}">
    function create_default_slot_2(ctx) {
    	let i;
    	let t;

    	const block = {
    		c: function create() {
    			i = element("i");
    			t = text(" Atrás");
    			attr_dev(i, "class", "fas fa-arrow-circle-left");
    			add_location(i, file$9, 420, 53, 11174);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, i, anchor);
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(i);
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2.name,
    		type: "slot",
    		source: "(421:1) <Button outline color=\\\"secondary\\\" on:click=\\\"{pop}\\\">",
    		ctx
    	});

    	return block;
    }

    // (422:1) <Button outline on:click={deleteGlobalCoef} color="danger" on:click={deleteAllAlert}>
    function create_default_slot_1(ctx) {
    	let i;
    	let t;

    	const block = {
    		c: function create() {
    			i = element("i");
    			t = text(" Borrar todo");
    			attr_dev(i, "class", "fa fa-trash");
    			attr_dev(i, "aria-hidden", "true");
    			add_location(i, file$9, 421, 87, 11319);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, i, anchor);
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(i);
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1.name,
    		type: "slot",
    		source: "(422:1) <Button outline on:click={deleteGlobalCoef} color=\\\"danger\\\" on:click={deleteAllAlert}>",
    		ctx
    	});

    	return block;
    }

    // (423:1) <Button outline color="primary" on:click="{ReloadTable}"  on:click={ReloadTableAlert}>
    function create_default_slot(ctx) {
    	let i;
    	let t;

    	const block = {
    		c: function create() {
    			i = element("i");
    			t = text(" Carga inicial de API");
    			attr_dev(i, "class", "fas fa-sync-alt");
    			add_location(i, file$9, 422, 88, 11477);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, i, anchor);
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(i);
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(423:1) <Button outline color=\\\"primary\\\" on:click=\\\"{ReloadTable}\\\"  on:click={ReloadTableAlert}>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$a(ctx) {
    	let main;
    	let div;
    	let t0;
    	let promise;
    	let t1;
    	let t2;
    	let t3;
    	let t4;
    	let current;

    	let info = {
    		ctx,
    		current: null,
    		token: null,
    		pending: create_pending_block,
    		then: create_then_block,
    		catch: create_catch_block,
    		value: 7,
    		blocks: [,,,]
    	};

    	handle_promise(promise = /*coef*/ ctx[7], info);

    	const pagination = new Pagination({
    			props: {
    				style: "float:right;",
    				ariaLabel: "Cambiar de página",
    				$$slots: { default: [create_default_slot_3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const button0 = new Button({
    			props: {
    				outline: true,
    				color: "secondary",
    				$$slots: { default: [create_default_slot_2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button0.$on("click", pop);

    	const button1 = new Button({
    			props: {
    				outline: true,
    				color: "danger",
    				$$slots: { default: [create_default_slot_1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button1.$on("click", /*deleteGlobalCoef*/ ctx[11]);
    	button1.$on("click", deleteAllAlert);

    	const button2 = new Button({
    			props: {
    				outline: true,
    				color: "primary",
    				$$slots: { default: [create_default_slot] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button2.$on("click", /*ReloadTable*/ ctx[8]);
    	button2.$on("click", ReloadTableAlert);

    	const block = {
    		c: function create() {
    			main = element("main");
    			div = element("div");
    			t0 = space();
    			info.block.c();
    			t1 = space();
    			create_component(pagination.$$.fragment);
    			t2 = space();
    			create_component(button0.$$.fragment);
    			t3 = space();
    			create_component(button1.$$.fragment);
    			t4 = space();
    			create_component(button2.$$.fragment);
    			attr_dev(div, "role", "alert");
    			attr_dev(div, "id", "div_alert");
    			set_style(div, "display", "none");
    			add_location(div, file$9, 321, 1, 8124);
    			add_location(main, file$9, 320, 0, 8115);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, div);
    			append_dev(main, t0);
    			info.block.m(main, info.anchor = null);
    			info.mount = () => main;
    			info.anchor = t1;
    			append_dev(main, t1);
    			mount_component(pagination, main, null);
    			append_dev(main, t2);
    			mount_component(button0, main, null);
    			append_dev(main, t3);
    			mount_component(button1, main, null);
    			append_dev(main, t4);
    			mount_component(button2, main, null);
    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			info.ctx = ctx;

    			if (dirty[0] & /*coef*/ 128 && promise !== (promise = /*coef*/ ctx[7]) && handle_promise(promise, info)) ; else {
    				const child_ctx = ctx.slice();
    				child_ctx[7] = info.resolved;
    				info.block.p(child_ctx, dirty);
    			}

    			const pagination_changes = {};

    			if (dirty[0] & /*moreData, currentPage*/ 96 | dirty[1] & /*$$scope*/ 256) {
    				pagination_changes.$$scope = { dirty, ctx };
    			}

    			pagination.$set(pagination_changes);
    			const button0_changes = {};

    			if (dirty[1] & /*$$scope*/ 256) {
    				button0_changes.$$scope = { dirty, ctx };
    			}

    			button0.$set(button0_changes);
    			const button1_changes = {};

    			if (dirty[1] & /*$$scope*/ 256) {
    				button1_changes.$$scope = { dirty, ctx };
    			}

    			button1.$set(button1_changes);
    			const button2_changes = {};

    			if (dirty[1] & /*$$scope*/ 256) {
    				button2_changes.$$scope = { dirty, ctx };
    			}

    			button2.$set(button2_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(info.block);
    			transition_in(pagination.$$.fragment, local);
    			transition_in(button0.$$.fragment, local);
    			transition_in(button1.$$.fragment, local);
    			transition_in(button2.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			for (let i = 0; i < 3; i += 1) {
    				const block = info.blocks[i];
    				transition_out(block);
    			}

    			transition_out(pagination.$$.fragment, local);
    			transition_out(button0.$$.fragment, local);
    			transition_out(button1.$$.fragment, local);
    			transition_out(button2.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			info.block.d();
    			info.token = null;
    			info = null;
    			destroy_component(pagination);
    			destroy_component(button0);
    			destroy_component(button1);
    			destroy_component(button2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$a.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function insertAlert() {
    	clearAlert();
    	var alert_element = document.getElementById("div_alert");
    	alert_element.style = "position: fixed; top: 0px; top: 2%; width: 90%;";
    	alert_element.className = "alert alert-dismissible in alert-success ";
    	alert_element.innerHTML = "<strong> Dato insertado</strong> Se ha insertado el dato correctamente";

    	setTimeout(
    		() => {
    			clearAlert();
    		},
    		3000
    	);
    }

    function deleteAlert() {
    	clearAlert();
    	var alert_element = document.getElementById("div_alert");
    	alert_element.style = "position: fixed; top: 0px; top: 2%; width: 90%;";
    	alert_element.className = "alert alert-dismissible in alert-danger ";
    	alert_element.innerHTML = "<strong> Dato borrado</strong> Se ha borrado el dato correctamente";

    	setTimeout(
    		() => {
    			clearAlert();
    		},
    		3000
    	);
    }

    function deleteAllAlert() {
    	clearAlert();
    	var alert_element = document.getElementById("div_alert");
    	alert_element.style = "position: fixed; top: 0px; top: 2%; width: 90%;";
    	alert_element.className = "alert alert-dismissible in alert-danger ";
    	alert_element.innerHTML = "<strong> Datos borrados</strong> Se han borrado todos los datos correctamente";

    	setTimeout(
    		() => {
    			clearAlert();
    		},
    		3000
    	);
    }

    function ReloadTableAlert() {
    	clearAlert();
    	var alert_element = document.getElementById("div_alert");
    	alert_element.style = "position: fixed; top: 0px; top: 2%; width: 90%;";
    	alert_element.className = "alert alert-dismissible in alert-info ";
    	alert_element.innerHTML = "<strong> Tabla Restaurada</strong> Se han cargado los datos iniciales";

    	setTimeout(
    		() => {
    			clearAlert();
    		},
    		3000
    	);
    }

    function errorAlert(error) {
    	clearAlert();
    	var alert_element = document.getElementById("div_alert");
    	alert_element.style = "position: fixed; top: 0px; top: 2%; width: 90%;";
    	alert_element.className = "alert alert-dismissible in alert-danger ";
    	alert_element.innerHTML = "<strong> Error</strong> Ha ocurrido un error " + error;

    	setTimeout(
    		() => {
    			clearAlert();
    		},
    		3000
    	);
    }

    function clearAlert() {
    	var alert_element = document.getElementById("div_alert");
    	alert_element.style = "display: none; ";
    	alert_element.className = "alert alert-dismissible in";
    	alert_element.innerHTML = "";
    }

    function instance$a($$self, $$props, $$invalidate) {
    	let BASE_API_URL = "/api/v2";
    	let coef = [];

    	let newCoef = {
    		country: "",
    		year: parseInt(""),
    		team: "",
    		coefficient: "",
    		fed: "",
    		classification: ""
    	};

    	//Variables para paginacion y busqueda
    	let teams = [];

    	let years = [];
    	let currentTeam = "-";
    	let currentYear = "-";
    	let numberElementsPages = 10;
    	let offset = 0;
    	let currentPage = 1;
    	let moreData = true;
    	onMount(getCoef);
    	onMount(getTeamsYears);

    	async function ReloadTable() {
    		const res = await fetch(BASE_API_URL + "/global-coef/loadInitialData");

    		if (res.ok) {
    			const initialCoef = await res.json();
    			console.log("Contados " + initialCoef.length + " datos de coef");
    			getCoef();
    		} else {
    			console.log("No se han cargado los datos inicales");
    		}
    	}

    	//Funcion que devuelve array con los equipos y años
    	async function getTeamsYears() {
    		const res = await fetch(BASE_API_URL + "/global-coef");

    		if (res.ok) {
    			const json = await res.json();

    			$$invalidate(1, teams = json.map(d => {
    				return d.team;
    			}));

    			$$invalidate(1, teams = Array.from(new Set(teams)));

    			$$invalidate(2, years = json.map(d => {
    				return d.year;
    			}));

    			$$invalidate(2, years = Array.from(new Set(years)));
    			console.log("Contados " + teams.length + "equipos y " + years.length + "años distintos.");
    		} else {
    			console.log("ERROR");
    		}
    	}

    	async function getCoef() {
    		console.log("Fetching coef...");
    		const res = await fetch(BASE_API_URL + "/global-coef?offset=" + numberElementsPages * offset + "&limit=" + numberElementsPages);

    		if (res.ok) {
    			console.log("Ok:");
    			const json = await res.json();
    			$$invalidate(7, coef = json);
    			console.log("Received " + coef.length + " coef.");

    			if (coef.length != 10) {
    				$$invalidate(6, moreData = false);
    			} else {
    				const next = await fetch(BASE_API_URL + "/global-coef?offset=" + numberElementsPages * (offset + 1) + "&limit=" + numberElementsPages);
    				console.log("La variable NEXT tiene el estado: " + next.status);
    				const jsonNext = await next.json();

    				if (jsonNext.length == 0 || next.status == 404) {
    					$$invalidate(6, moreData = false);
    				} else {
    					$$invalidate(6, moreData = true);
    				}
    			}
    		} else {
    			console.log("ERROR");
    		}
    	}

    	async function insertCoef() {
    		console.log("Inserting coef..." + JSON.stringify(newCoef));

    		if (newCoef.team == "" || newCoef.team == null || newCoef.year == "" || newCoef.year == null) {
    			alert("Se debe incluir el nombre del equipo y año obligatoriamente");
    		} else {
    			const res = await fetch(BASE_API_URL + "/global-coef", {
    				method: "POST",
    				body: JSON.stringify(newCoef),
    				headers: { "Content-Type": "application/json" }
    			}).then(function (res) {
    				if (res.ok) {
    					getCoef();
    					insertAlert();
    				} else {
    					errorAlert("Error interno al intentar insertar un elemento");
    				}
    			});
    		}
    	}

    	//Borrar un equipo en un año 
    	async function deleteCoef(team, year) {
    		console.log("Deleting coef..." + JSON.stringify(team) + +JSON.stringify(year));

    		const res = await fetch(BASE_API_URL + "/global-coef/" + team + "/" + year, { method: "DELETE" }).then(function (res) {
    			if (res.ok) {
    				getCoef();
    				getTeamsYears();

    				//errorResponse(res)
    				deleteAlert();
    			} else if (res.status == 404) {
    				errorAlert("Se ha intentado borrar un elemento inexistente.");
    			} else {
    				errorAlert("Error al borrar un elemento");
    			}
    		});
    	}

    	//Borrar todos los equipos
    	async function deleteGlobalCoef() {
    		console.log("Deleting all coef data...");

    		const res = await fetch(BASE_API_URL + "/global-coef/", { method: "DELETE" }).then(function (res) {
    			if (res.ok) {
    				const json = res.json();
    				$$invalidate(7, coef = json);
    			} else {
    				errorAlert("Error al borrar todos los elementos");
    			}
    		});
    	}

    	async function search(team, year) {
    		console.log("Searching data: " + team + " and " + year);
    		var url = BASE_API_URL + "/global-coef";

    		if (team != "-" && year != "-") {
    			url = url + "?team=" + team + "&year=" + year;
    		} else if (team != "-" && year == "-") {
    			url = url + "?team=" + team;
    		} else if (team == "-" && year != "-") {
    			url = url + "?year=" + year;
    		}

    		const res = await fetch(url);

    		if (res.ok) {
    			console.log("Ok:");
    			const json = await res.json();
    			$$invalidate(7, coef = json);
    			console.log("Found " + coef.length + " global coef stats.");
    		} else {
    			console.log("ERROR");
    		}
    	}

    	function addOffset(increment) {
    		offset += increment;
    		$$invalidate(5, currentPage += increment);
    		getCoef();
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1$2.warn(`<CoefTable> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("CoefTable", $$slots, []);

    	function input_value_binding(value) {
    		currentTeam = value;
    		$$invalidate(3, currentTeam);
    	}

    	function input_value_binding_1(value) {
    		currentYear = value;
    		$$invalidate(4, currentYear);
    	}

    	function input0_input_handler() {
    		newCoef.country = this.value;
    		$$invalidate(0, newCoef);
    	}

    	function input1_input_handler() {
    		newCoef.year = to_number(this.value);
    		$$invalidate(0, newCoef);
    	}

    	function input2_input_handler() {
    		newCoef.team = this.value;
    		$$invalidate(0, newCoef);
    	}

    	function input3_input_handler() {
    		newCoef.coefficient = to_number(this.value);
    		$$invalidate(0, newCoef);
    	}

    	function input4_input_handler() {
    		newCoef.fed = to_number(this.value);
    		$$invalidate(0, newCoef);
    	}

    	function input5_input_handler() {
    		newCoef.classification = to_number(this.value);
    		$$invalidate(0, newCoef);
    	}

    	const click_handler = () => addOffset(-1);
    	const click_handler_1 = () => addOffset(-1);
    	const click_handler_2 = () => addOffset(1);
    	const click_handler_3 = () => addOffset(1);

    	$$self.$capture_state = () => ({
    		onMount,
    		pop,
    		Table,
    		Button,
    		Input,
    		Label,
    		FormGroup,
    		Pagination,
    		PaginationItem,
    		PaginationLink,
    		BASE_API_URL,
    		coef,
    		newCoef,
    		teams,
    		years,
    		currentTeam,
    		currentYear,
    		numberElementsPages,
    		offset,
    		currentPage,
    		moreData,
    		ReloadTable,
    		getTeamsYears,
    		getCoef,
    		insertCoef,
    		deleteCoef,
    		deleteGlobalCoef,
    		search,
    		addOffset,
    		insertAlert,
    		deleteAlert,
    		deleteAllAlert,
    		ReloadTableAlert,
    		errorAlert,
    		clearAlert
    	});

    	$$self.$inject_state = $$props => {
    		if ("BASE_API_URL" in $$props) BASE_API_URL = $$props.BASE_API_URL;
    		if ("coef" in $$props) $$invalidate(7, coef = $$props.coef);
    		if ("newCoef" in $$props) $$invalidate(0, newCoef = $$props.newCoef);
    		if ("teams" in $$props) $$invalidate(1, teams = $$props.teams);
    		if ("years" in $$props) $$invalidate(2, years = $$props.years);
    		if ("currentTeam" in $$props) $$invalidate(3, currentTeam = $$props.currentTeam);
    		if ("currentYear" in $$props) $$invalidate(4, currentYear = $$props.currentYear);
    		if ("numberElementsPages" in $$props) numberElementsPages = $$props.numberElementsPages;
    		if ("offset" in $$props) offset = $$props.offset;
    		if ("currentPage" in $$props) $$invalidate(5, currentPage = $$props.currentPage);
    		if ("moreData" in $$props) $$invalidate(6, moreData = $$props.moreData);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		newCoef,
    		teams,
    		years,
    		currentTeam,
    		currentYear,
    		currentPage,
    		moreData,
    		coef,
    		ReloadTable,
    		insertCoef,
    		deleteCoef,
    		deleteGlobalCoef,
    		search,
    		addOffset,
    		offset,
    		BASE_API_URL,
    		numberElementsPages,
    		getTeamsYears,
    		getCoef,
    		input_value_binding,
    		input_value_binding_1,
    		input0_input_handler,
    		input1_input_handler,
    		input2_input_handler,
    		input3_input_handler,
    		input4_input_handler,
    		input5_input_handler,
    		click_handler,
    		click_handler_1,
    		click_handler_2,
    		click_handler_3
    	];
    }

    class CoefTable extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$a, create_fragment$a, safe_not_equal, {}, [-1, -1]);

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "CoefTable",
    			options,
    			id: create_fragment$a.name
    		});
    	}
    }

    /* src\front\CoefGUI\App.svelte generated by Svelte v3.21.0 */
    const file$a = "src\\front\\CoefGUI\\App.svelte";

    function create_fragment$b(ctx) {
    	let main;
    	let h1;
    	let t1;
    	let current;
    	const coeftable = new CoefTable({ $$inline: true });

    	const block = {
    		c: function create() {
    			main = element("main");
    			h1 = element("h1");
    			h1.textContent = "Administrador de Coef";
    			t1 = space();
    			create_component(coeftable.$$.fragment);
    			attr_dev(h1, "class", "display-4");
    			set_style(h1, "text-align", "center");
    			add_location(h1, file$a, 5, 1, 73);
    			add_location(main, file$a, 4, 0, 65);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, h1);
    			append_dev(main, t1);
    			mount_component(coeftable, main, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(coeftable.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(coeftable.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_component(coeftable);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$b.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$b($$self, $$props, $$invalidate) {
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("App", $$slots, []);
    	$$self.$capture_state = () => ({ CoefTable });
    	return [];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$b, create_fragment$b, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment$b.name
    		});
    	}
    }

    /* src\front\CoefGUI\EditCoef.svelte generated by Svelte v3.21.0 */

    const { console: console_1$3 } = globals;
    const file$b = "src\\front\\CoefGUI\\EditCoef.svelte";

    // (1:0) <script>      import {          onMount      }
    function create_catch_block$1(ctx) {
    	const block = {
    		c: noop,
    		m: noop,
    		p: noop,
    		i: noop,
    		o: noop,
    		d: noop
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_catch_block$1.name,
    		type: "catch",
    		source: "(1:0) <script>      import {          onMount      }",
    		ctx
    	});

    	return block;
    }

    // (121:4) {:then coef}
    function create_then_block$1(ctx) {
    	let current;

    	const table = new Table({
    			props: {
    				bordered: true,
    				$$slots: { default: [create_default_slot_1$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(table.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(table, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const table_changes = {};

    			if (dirty & /*$$scope, updatedClassification, updatedFed, updatedCoefficient, updatedTeam, updatedYear, updatedCountry*/ 65662) {
    				table_changes.$$scope = { dirty, ctx };
    			}

    			table.$set(table_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(table.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(table.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(table, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_then_block$1.name,
    		type: "then",
    		source: "(121:4) {:then coef}",
    		ctx
    	});

    	return block;
    }

    // (142:25) <Button outline  color="primary" on:click={updateCoef} on:click={updateAlert}>
    function create_default_slot_2$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Actualizar");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2$1.name,
    		type: "slot",
    		source: "(142:25) <Button outline  color=\\\"primary\\\" on:click={updateCoef} on:click={updateAlert}>",
    		ctx
    	});

    	return block;
    }

    // (122:8) <Table bordered>
    function create_default_slot_1$1(ctx) {
    	let thead;
    	let tr0;
    	let th0;
    	let t1;
    	let th1;
    	let t3;
    	let th2;
    	let t5;
    	let th3;
    	let t7;
    	let th4;
    	let t9;
    	let th5;
    	let t11;
    	let th6;
    	let t13;
    	let tbody;
    	let tr1;
    	let td0;
    	let input0;
    	let t14;
    	let td1;
    	let t15;
    	let t16;
    	let td2;
    	let t17;
    	let t18;
    	let td3;
    	let input1;
    	let t19;
    	let td4;
    	let input2;
    	let t20;
    	let td5;
    	let input3;
    	let t21;
    	let td6;
    	let current;
    	let dispose;

    	const button = new Button({
    			props: {
    				outline: true,
    				color: "primary",
    				$$slots: { default: [create_default_slot_2$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button.$on("click", /*updateCoef*/ ctx[9]);
    	button.$on("click", updateAlert);

    	const block = {
    		c: function create() {
    			thead = element("thead");
    			tr0 = element("tr");
    			th0 = element("th");
    			th0.textContent = "País";
    			t1 = space();
    			th1 = element("th");
    			th1.textContent = "Año";
    			t3 = space();
    			th2 = element("th");
    			th2.textContent = "Equipo";
    			t5 = space();
    			th3 = element("th");
    			th3.textContent = "Coeficiente";
    			t7 = space();
    			th4 = element("th");
    			th4.textContent = "Fed";
    			t9 = space();
    			th5 = element("th");
    			th5.textContent = "Clasificación";
    			t11 = space();
    			th6 = element("th");
    			th6.textContent = "Acciones";
    			t13 = space();
    			tbody = element("tbody");
    			tr1 = element("tr");
    			td0 = element("td");
    			input0 = element("input");
    			t14 = space();
    			td1 = element("td");
    			t15 = text(/*updatedYear*/ ctx[2]);
    			t16 = space();
    			td2 = element("td");
    			t17 = text(/*updatedTeam*/ ctx[3]);
    			t18 = space();
    			td3 = element("td");
    			input1 = element("input");
    			t19 = space();
    			td4 = element("td");
    			input2 = element("input");
    			t20 = space();
    			td5 = element("td");
    			input3 = element("input");
    			t21 = space();
    			td6 = element("td");
    			create_component(button.$$.fragment);
    			add_location(th0, file$b, 124, 20, 3738);
    			add_location(th1, file$b, 125, 20, 3773);
    			add_location(th2, file$b, 126, 20, 3807);
    			add_location(th3, file$b, 127, 20, 3844);
    			add_location(th4, file$b, 128, 20, 3886);
    			add_location(th5, file$b, 129, 20, 3920);
    			add_location(th6, file$b, 130, 20, 3964);
    			add_location(tr0, file$b, 123, 16, 3712);
    			add_location(thead, file$b, 122, 12, 3687);
    			add_location(input0, file$b, 135, 24, 4095);
    			add_location(td0, file$b, 135, 20, 4091);
    			add_location(td1, file$b, 136, 20, 4159);
    			add_location(td2, file$b, 137, 20, 4203);
    			attr_dev(input1, "type", "number");
    			add_location(input1, file$b, 138, 24, 4251);
    			add_location(td3, file$b, 138, 20, 4247);
    			attr_dev(input2, "type", "number");
    			add_location(input2, file$b, 139, 24, 4337);
    			add_location(td4, file$b, 139, 20, 4333);
    			attr_dev(input3, "type", "number");
    			add_location(input3, file$b, 140, 24, 4415);
    			add_location(td5, file$b, 140, 20, 4411);
    			add_location(td6, file$b, 141, 20, 4500);
    			add_location(tr1, file$b, 134, 16, 4065);
    			add_location(tbody, file$b, 133, 12, 4040);
    		},
    		m: function mount(target, anchor, remount) {
    			insert_dev(target, thead, anchor);
    			append_dev(thead, tr0);
    			append_dev(tr0, th0);
    			append_dev(tr0, t1);
    			append_dev(tr0, th1);
    			append_dev(tr0, t3);
    			append_dev(tr0, th2);
    			append_dev(tr0, t5);
    			append_dev(tr0, th3);
    			append_dev(tr0, t7);
    			append_dev(tr0, th4);
    			append_dev(tr0, t9);
    			append_dev(tr0, th5);
    			append_dev(tr0, t11);
    			append_dev(tr0, th6);
    			insert_dev(target, t13, anchor);
    			insert_dev(target, tbody, anchor);
    			append_dev(tbody, tr1);
    			append_dev(tr1, td0);
    			append_dev(td0, input0);
    			set_input_value(input0, /*updatedCountry*/ ctx[1]);
    			append_dev(tr1, t14);
    			append_dev(tr1, td1);
    			append_dev(td1, t15);
    			append_dev(tr1, t16);
    			append_dev(tr1, td2);
    			append_dev(td2, t17);
    			append_dev(tr1, t18);
    			append_dev(tr1, td3);
    			append_dev(td3, input1);
    			set_input_value(input1, /*updatedCoefficient*/ ctx[4]);
    			append_dev(tr1, t19);
    			append_dev(tr1, td4);
    			append_dev(td4, input2);
    			set_input_value(input2, /*updatedFed*/ ctx[5]);
    			append_dev(tr1, t20);
    			append_dev(tr1, td5);
    			append_dev(td5, input3);
    			set_input_value(input3, /*updatedClassification*/ ctx[6]);
    			append_dev(tr1, t21);
    			append_dev(tr1, td6);
    			mount_component(button, td6, null);
    			current = true;
    			if (remount) run_all(dispose);

    			dispose = [
    				listen_dev(input0, "input", /*input0_input_handler*/ ctx[12]),
    				listen_dev(input1, "input", /*input1_input_handler*/ ctx[13]),
    				listen_dev(input2, "input", /*input2_input_handler*/ ctx[14]),
    				listen_dev(input3, "input", /*input3_input_handler*/ ctx[15])
    			];
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*updatedCountry*/ 2 && input0.value !== /*updatedCountry*/ ctx[1]) {
    				set_input_value(input0, /*updatedCountry*/ ctx[1]);
    			}

    			if (!current || dirty & /*updatedYear*/ 4) set_data_dev(t15, /*updatedYear*/ ctx[2]);
    			if (!current || dirty & /*updatedTeam*/ 8) set_data_dev(t17, /*updatedTeam*/ ctx[3]);

    			if (dirty & /*updatedCoefficient*/ 16 && to_number(input1.value) !== /*updatedCoefficient*/ ctx[4]) {
    				set_input_value(input1, /*updatedCoefficient*/ ctx[4]);
    			}

    			if (dirty & /*updatedFed*/ 32 && to_number(input2.value) !== /*updatedFed*/ ctx[5]) {
    				set_input_value(input2, /*updatedFed*/ ctx[5]);
    			}

    			if (dirty & /*updatedClassification*/ 64 && to_number(input3.value) !== /*updatedClassification*/ ctx[6]) {
    				set_input_value(input3, /*updatedClassification*/ ctx[6]);
    			}

    			const button_changes = {};

    			if (dirty & /*$$scope*/ 65536) {
    				button_changes.$$scope = { dirty, ctx };
    			}

    			button.$set(button_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(button.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(button.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(thead);
    			if (detaching) detach_dev(t13);
    			if (detaching) detach_dev(tbody);
    			destroy_component(button);
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$1.name,
    		type: "slot",
    		source: "(122:8) <Table bordered>",
    		ctx
    	});

    	return block;
    }

    // (119:17)           Loading coef...      {:then coef}
    function create_pending_block$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Loading coef...");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_pending_block$1.name,
    		type: "pending",
    		source: "(119:17)           Loading coef...      {:then coef}",
    		ctx
    	});

    	return block;
    }

    // (147:4) {#if errorMsg}
    function create_if_block$7(ctx) {
    	let p;
    	let t0;
    	let t1;

    	const block = {
    		c: function create() {
    			p = element("p");
    			t0 = text("ERROR: ");
    			t1 = text(/*errorMsg*/ ctx[7]);
    			set_style(p, "color", "red");
    			add_location(p, file$b, 147, 8, 4712);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			append_dev(p, t0);
    			append_dev(p, t1);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*errorMsg*/ 128) set_data_dev(t1, /*errorMsg*/ ctx[7]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$7.name,
    		type: "if",
    		source: "(147:4) {#if errorMsg}",
    		ctx
    	});

    	return block;
    }

    // (150:4) <Button outline color="secondary" on:click="{pop}">
    function create_default_slot$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Atrás");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$1.name,
    		type: "slot",
    		source: "(150:4) <Button outline color=\\\"secondary\\\" on:click=\\\"{pop}\\\">",
    		ctx
    	});

    	return block;
    }

    function create_fragment$c(ctx) {
    	let main;
    	let div;
    	let t0;
    	let h3;
    	let t1;
    	let strong;
    	let t2_value = /*params*/ ctx[0].team + "";
    	let t2;
    	let t3;
    	let promise;
    	let t4;
    	let t5;
    	let current;

    	let info = {
    		ctx,
    		current: null,
    		token: null,
    		pending: create_pending_block$1,
    		then: create_then_block$1,
    		catch: create_catch_block$1,
    		value: 8,
    		blocks: [,,,]
    	};

    	handle_promise(promise = /*coef*/ ctx[8], info);
    	let if_block = /*errorMsg*/ ctx[7] && create_if_block$7(ctx);

    	const button = new Button({
    			props: {
    				outline: true,
    				color: "secondary",
    				$$slots: { default: [create_default_slot$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button.$on("click", pop);

    	const block = {
    		c: function create() {
    			main = element("main");
    			div = element("div");
    			t0 = space();
    			h3 = element("h3");
    			t1 = text("Editar Coef ");
    			strong = element("strong");
    			t2 = text(t2_value);
    			t3 = space();
    			info.block.c();
    			t4 = space();
    			if (if_block) if_block.c();
    			t5 = space();
    			create_component(button.$$.fragment);
    			attr_dev(div, "role", "alert");
    			attr_dev(div, "id", "div_alert");
    			set_style(div, "display", "none");
    			add_location(div, file$b, 115, 4, 3464);
    			add_location(strong, file$b, 117, 20, 3550);
    			add_location(h3, file$b, 117, 4, 3534);
    			add_location(main, file$b, 114, 0, 3452);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, div);
    			append_dev(main, t0);
    			append_dev(main, h3);
    			append_dev(h3, t1);
    			append_dev(h3, strong);
    			append_dev(strong, t2);
    			append_dev(main, t3);
    			info.block.m(main, info.anchor = null);
    			info.mount = () => main;
    			info.anchor = t4;
    			append_dev(main, t4);
    			if (if_block) if_block.m(main, null);
    			append_dev(main, t5);
    			mount_component(button, main, null);
    			current = true;
    		},
    		p: function update(new_ctx, [dirty]) {
    			ctx = new_ctx;
    			if ((!current || dirty & /*params*/ 1) && t2_value !== (t2_value = /*params*/ ctx[0].team + "")) set_data_dev(t2, t2_value);
    			info.ctx = ctx;

    			if (dirty & /*coef*/ 256 && promise !== (promise = /*coef*/ ctx[8]) && handle_promise(promise, info)) ; else {
    				const child_ctx = ctx.slice();
    				child_ctx[8] = info.resolved;
    				info.block.p(child_ctx, dirty);
    			}

    			if (/*errorMsg*/ ctx[7]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$7(ctx);
    					if_block.c();
    					if_block.m(main, t5);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			const button_changes = {};

    			if (dirty & /*$$scope*/ 65536) {
    				button_changes.$$scope = { dirty, ctx };
    			}

    			button.$set(button_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(info.block);
    			transition_in(button.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			for (let i = 0; i < 3; i += 1) {
    				const block = info.blocks[i];
    				transition_out(block);
    			}

    			transition_out(button.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			info.block.d();
    			info.token = null;
    			info = null;
    			if (if_block) if_block.d();
    			destroy_component(button);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$c.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function errorAlert$1(error) {
    	clearAlert$1();
    	var alert_element = document.getElementById("div_alert");
    	alert_element.style = "position: fixed; top: 0px; top: 1%; width: 90%;";
    	alert_element.className = "alert alert-dismissible in alert-danger ";
    	alert_element.innerHTML = "<strong>ERROR</strong> Ha sucedido un error " + error;

    	setTimeout(
    		() => {
    			clearAlert$1();
    		},
    		3000
    	);
    }

    function updateAlert() {
    	clearAlert$1();
    	var alert_element = document.getElementById("div_alert");
    	alert_element.style = "position: fixed; top: 0px; top: 1%; width: 90%;";
    	alert_element.className = "alert alert-dismissible in alert-info ";
    	alert_element.innerHTML = "<strong>Dato actualizado</strong> El dato ha sido actualizado";

    	setTimeout(
    		() => {
    			clearAlert$1();
    		},
    		3000
    	);
    }

    function clearAlert$1() {
    	var alert_element = document.getElementById("div_alert");
    	alert_element.style = "display: none; ";
    	alert_element.className = "alert alert-dismissible in";
    	alert_element.innerHTML = "";
    }

    function instance$c($$self, $$props, $$invalidate) {
    	let { params = {} } = $$props;
    	let BASE_API_URL = "/api/v2";
    	let coef = {};
    	let updatedCountry = "XXXX";
    	let updatedYear = 2000;
    	let updatedTeam = "ZZZZ";
    	let updatedCoefficient = 140;
    	let updatedFed = 20;
    	let updatedClassification = 1;
    	let errorMsg = "";
    	onMount(getCoef);

    	async function getCoef() {
    		console.log("Fetching coef...");
    		const res = await fetch(BASE_API_URL + "/global-coef/" + params.team + "/" + params.year);

    		if (res.ok) {
    			console.log("Ok:");
    			const json = await res.json();
    			$$invalidate(8, coef = json);
    			$$invalidate(1, updatedCountry = coef.country);
    			$$invalidate(2, updatedYear = coef.year);
    			$$invalidate(3, updatedTeam = coef.team);
    			$$invalidate(4, updatedCoefficient = coef.coefficient);
    			$$invalidate(5, updatedFed = coef.fed);
    			$$invalidate(6, updatedClassification = coef.classification);
    			console.log("Received coef");
    		} else {
    			$$invalidate(7, errorMsg = res.status + ": " + res.statusText);
    			console.log("ERROR" + errorMsg);
    		}
    	}

    	async function updateCoef() {
    		console.log("Updating coef..." + JSON.stringify(params.team));

    		const res = await fetch(BASE_API_URL + "/global-coef/" + params.team + "/" + params.year, {
    			method: "PUT",
    			body: JSON.stringify({
    				country: updatedCountry,
    				year: parseInt(params.year),
    				team: params.team,
    				coefficient: updatedCoefficient,
    				fed: updatedFed,
    				classification: updatedClassification
    			}),
    			headers: { "Content-Type": "application/json" }
    		}).then(function (res) {
    			if (res.ok) {
    				getCoef();
    			} else if (res.status == 404) {
    				errorAlert$1("Se ha intentado borrar un elemento inexistente.");
    			} else {
    				errorAlert$1("");
    			}
    		});
    	}

    	const writable_props = ["params"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1$3.warn(`<EditCoef> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("EditCoef", $$slots, []);

    	function input0_input_handler() {
    		updatedCountry = this.value;
    		$$invalidate(1, updatedCountry);
    	}

    	function input1_input_handler() {
    		updatedCoefficient = to_number(this.value);
    		$$invalidate(4, updatedCoefficient);
    	}

    	function input2_input_handler() {
    		updatedFed = to_number(this.value);
    		$$invalidate(5, updatedFed);
    	}

    	function input3_input_handler() {
    		updatedClassification = to_number(this.value);
    		$$invalidate(6, updatedClassification);
    	}

    	$$self.$set = $$props => {
    		if ("params" in $$props) $$invalidate(0, params = $$props.params);
    	};

    	$$self.$capture_state = () => ({
    		onMount,
    		pop,
    		Table,
    		Button,
    		Input,
    		params,
    		BASE_API_URL,
    		coef,
    		updatedCountry,
    		updatedYear,
    		updatedTeam,
    		updatedCoefficient,
    		updatedFed,
    		updatedClassification,
    		errorMsg,
    		getCoef,
    		updateCoef,
    		errorAlert: errorAlert$1,
    		updateAlert,
    		clearAlert: clearAlert$1
    	});

    	$$self.$inject_state = $$props => {
    		if ("params" in $$props) $$invalidate(0, params = $$props.params);
    		if ("BASE_API_URL" in $$props) BASE_API_URL = $$props.BASE_API_URL;
    		if ("coef" in $$props) $$invalidate(8, coef = $$props.coef);
    		if ("updatedCountry" in $$props) $$invalidate(1, updatedCountry = $$props.updatedCountry);
    		if ("updatedYear" in $$props) $$invalidate(2, updatedYear = $$props.updatedYear);
    		if ("updatedTeam" in $$props) $$invalidate(3, updatedTeam = $$props.updatedTeam);
    		if ("updatedCoefficient" in $$props) $$invalidate(4, updatedCoefficient = $$props.updatedCoefficient);
    		if ("updatedFed" in $$props) $$invalidate(5, updatedFed = $$props.updatedFed);
    		if ("updatedClassification" in $$props) $$invalidate(6, updatedClassification = $$props.updatedClassification);
    		if ("errorMsg" in $$props) $$invalidate(7, errorMsg = $$props.errorMsg);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		params,
    		updatedCountry,
    		updatedYear,
    		updatedTeam,
    		updatedCoefficient,
    		updatedFed,
    		updatedClassification,
    		errorMsg,
    		coef,
    		updateCoef,
    		BASE_API_URL,
    		getCoef,
    		input0_input_handler,
    		input1_input_handler,
    		input2_input_handler,
    		input3_input_handler
    	];
    }

    class EditCoef extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$c, create_fragment$c, safe_not_equal, { params: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "EditCoef",
    			options,
    			id: create_fragment$c.name
    		});
    	}

    	get params() {
    		throw new Error("<EditCoef>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set params(value) {
    		throw new Error("<EditCoef>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\front\TransfersGUI\TransfersTable.svelte generated by Svelte v3.21.0 */

    const { console: console_1$4 } = globals;
    const file$c = "src\\front\\TransfersGUI\\TransfersTable.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[31] = list[i];
    	return child_ctx;
    }

    function get_each_context_1$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[34] = list[i];
    	return child_ctx;
    }

    function get_each_context_2$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[37] = list[i];
    	return child_ctx;
    }

    // (1:0) <script>   import {    onMount   }
    function create_catch_block$2(ctx) {
    	const block = {
    		c: noop,
    		m: noop,
    		p: noop,
    		i: noop,
    		o: noop,
    		d: noop
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_catch_block$2.name,
    		type: "catch",
    		source: "(1:0) <script>   import {    onMount   }",
    		ctx
    	});

    	return block;
    }

    // (305:1) {:then transfers}
    function create_then_block$2(ctx) {
    	let t0;
    	let t1;
    	let t2;
    	let t3;
    	let current;

    	const formgroup0 = new FormGroup({
    			props: {
    				$$slots: { default: [create_default_slot_20$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const formgroup1 = new FormGroup({
    			props: {
    				$$slots: { default: [create_default_slot_17$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const button0 = new Button({
    			props: {
    				outline: true,
    				color: "secondary",
    				class: "button-search",
    				$$slots: { default: [create_default_slot_16$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button0.$on("click", function () {
    		if (is_function(/*search*/ ctx[12](/*currentYear*/ ctx[3], /*currentTeam*/ ctx[4]))) /*search*/ ctx[12](/*currentYear*/ ctx[3], /*currentTeam*/ ctx[4]).apply(this, arguments);
    	});

    	const button1 = new Button({
    			props: {
    				color: "success",
    				$$slots: { default: [create_default_slot_15$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button1.$on("click", /*ReloadTable*/ ctx[8]);
    	button1.$on("click", ReloadTableAlert$1);

    	const table = new Table({
    			props: {
    				bordered: true,
    				$$slots: { default: [create_default_slot_11$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(formgroup0.$$.fragment);
    			t0 = space();
    			create_component(formgroup1.$$.fragment);
    			t1 = space();
    			create_component(button0.$$.fragment);
    			t2 = space();
    			create_component(button1.$$.fragment);
    			t3 = space();
    			create_component(table.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(formgroup0, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(formgroup1, target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(button0, target, anchor);
    			insert_dev(target, t2, anchor);
    			mount_component(button1, target, anchor);
    			insert_dev(target, t3, anchor);
    			mount_component(table, target, anchor);
    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			const formgroup0_changes = {};

    			if (dirty[0] & /*currentYear, years*/ 10 | dirty[1] & /*$$scope*/ 512) {
    				formgroup0_changes.$$scope = { dirty, ctx };
    			}

    			formgroup0.$set(formgroup0_changes);
    			const formgroup1_changes = {};

    			if (dirty[0] & /*currentTeam, teams*/ 20 | dirty[1] & /*$$scope*/ 512) {
    				formgroup1_changes.$$scope = { dirty, ctx };
    			}

    			formgroup1.$set(formgroup1_changes);
    			const button0_changes = {};

    			if (dirty[1] & /*$$scope*/ 512) {
    				button0_changes.$$scope = { dirty, ctx };
    			}

    			button0.$set(button0_changes);
    			const button1_changes = {};

    			if (dirty[1] & /*$$scope*/ 512) {
    				button1_changes.$$scope = { dirty, ctx };
    			}

    			button1.$set(button1_changes);
    			const table_changes = {};

    			if (dirty[0] & /*transfers, newTransfer*/ 129 | dirty[1] & /*$$scope*/ 512) {
    				table_changes.$$scope = { dirty, ctx };
    			}

    			table.$set(table_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(formgroup0.$$.fragment, local);
    			transition_in(formgroup1.$$.fragment, local);
    			transition_in(button0.$$.fragment, local);
    			transition_in(button1.$$.fragment, local);
    			transition_in(table.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(formgroup0.$$.fragment, local);
    			transition_out(formgroup1.$$.fragment, local);
    			transition_out(button0.$$.fragment, local);
    			transition_out(button1.$$.fragment, local);
    			transition_out(table.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(formgroup0, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(formgroup1, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(button0, detaching);
    			if (detaching) detach_dev(t2);
    			destroy_component(button1, detaching);
    			if (detaching) detach_dev(t3);
    			destroy_component(table, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_then_block$2.name,
    		type: "then",
    		source: "(305:1) {:then transfers}",
    		ctx
    	});

    	return block;
    }

    // (308:3) <Label for="selectYear">
    function create_default_slot_22(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Año");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_22.name,
    		type: "slot",
    		source: "(308:3) <Label for=\\\"selectYear\\\">",
    		ctx
    	});

    	return block;
    }

    // (310:4) {#each years as year}
    function create_each_block_2$1(ctx) {
    	let option;
    	let t_value = /*year*/ ctx[37] + "";
    	let t;
    	let option_value_value;

    	const block = {
    		c: function create() {
    			option = element("option");
    			t = text(t_value);
    			option.__value = option_value_value = /*year*/ ctx[37];
    			option.value = option.__value;
    			add_location(option, file$c, 310, 4, 8243);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, option, anchor);
    			append_dev(option, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*years*/ 2 && t_value !== (t_value = /*year*/ ctx[37] + "")) set_data_dev(t, t_value);

    			if (dirty[0] & /*years*/ 2 && option_value_value !== (option_value_value = /*year*/ ctx[37])) {
    				prop_dev(option, "__value", option_value_value);
    			}

    			option.value = option.__value;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(option);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_2$1.name,
    		type: "each",
    		source: "(310:4) {#each years as year}",
    		ctx
    	});

    	return block;
    }

    // (309:3) <Input type="select"  name="selectYear" id="selectYear" bind:value="{currentYear}">
    function create_default_slot_21$1(ctx) {
    	let t0;
    	let option;
    	let each_value_2 = /*years*/ ctx[1];
    	validate_each_argument(each_value_2);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_2.length; i += 1) {
    		each_blocks[i] = create_each_block_2$1(get_each_context_2$1(ctx, each_value_2, i));
    	}

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t0 = space();
    			option = element("option");
    			option.textContent = "-";
    			option.__value = "-";
    			option.value = option.__value;
    			add_location(option, file$c, 312, 4, 8285);
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, t0, anchor);
    			insert_dev(target, option, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*years*/ 2) {
    				each_value_2 = /*years*/ ctx[1];
    				validate_each_argument(each_value_2);
    				let i;

    				for (i = 0; i < each_value_2.length; i += 1) {
    					const child_ctx = get_each_context_2$1(ctx, each_value_2, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_2$1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(t0.parentNode, t0);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value_2.length;
    			}
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(option);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_21$1.name,
    		type: "slot",
    		source: "(309:3) <Input type=\\\"select\\\"  name=\\\"selectYear\\\" id=\\\"selectYear\\\" bind:value=\\\"{currentYear}\\\">",
    		ctx
    	});

    	return block;
    }

    // (307:2) <FormGroup>
    function create_default_slot_20$1(ctx) {
    	let t;
    	let updating_value;
    	let current;

    	const label = new Label({
    			props: {
    				for: "selectYear",
    				$$slots: { default: [create_default_slot_22] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	function input_value_binding(value) {
    		/*input_value_binding*/ ctx[19].call(null, value);
    	}

    	let input_props = {
    		type: "select",
    		name: "selectYear",
    		id: "selectYear",
    		$$slots: { default: [create_default_slot_21$1] },
    		$$scope: { ctx }
    	};

    	if (/*currentYear*/ ctx[3] !== void 0) {
    		input_props.value = /*currentYear*/ ctx[3];
    	}

    	const input = new Input({ props: input_props, $$inline: true });
    	binding_callbacks.push(() => bind(input, "value", input_value_binding));

    	const block = {
    		c: function create() {
    			create_component(label.$$.fragment);
    			t = space();
    			create_component(input.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(label, target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(input, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const label_changes = {};

    			if (dirty[1] & /*$$scope*/ 512) {
    				label_changes.$$scope = { dirty, ctx };
    			}

    			label.$set(label_changes);
    			const input_changes = {};

    			if (dirty[0] & /*years*/ 2 | dirty[1] & /*$$scope*/ 512) {
    				input_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_value && dirty[0] & /*currentYear*/ 8) {
    				updating_value = true;
    				input_changes.value = /*currentYear*/ ctx[3];
    				add_flush_callback(() => updating_value = false);
    			}

    			input.$set(input_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(label.$$.fragment, local);
    			transition_in(input.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(label.$$.fragment, local);
    			transition_out(input.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(label, detaching);
    			if (detaching) detach_dev(t);
    			destroy_component(input, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_20$1.name,
    		type: "slot",
    		source: "(307:2) <FormGroup>",
    		ctx
    	});

    	return block;
    }

    // (318:3) <Label for="selectTeam">
    function create_default_slot_19$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Búsqueda por equipo");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_19$1.name,
    		type: "slot",
    		source: "(318:3) <Label for=\\\"selectTeam\\\">",
    		ctx
    	});

    	return block;
    }

    // (320:4) {#each teams as team}
    function create_each_block_1$1(ctx) {
    	let option;
    	let t_value = /*team*/ ctx[34] + "";
    	let t;
    	let option_value_value;

    	const block = {
    		c: function create() {
    			option = element("option");
    			t = text(t_value);
    			option.__value = option_value_value = /*team*/ ctx[34];
    			option.value = option.__value;
    			add_location(option, file$c, 320, 4, 8528);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, option, anchor);
    			append_dev(option, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*teams*/ 4 && t_value !== (t_value = /*team*/ ctx[34] + "")) set_data_dev(t, t_value);

    			if (dirty[0] & /*teams*/ 4 && option_value_value !== (option_value_value = /*team*/ ctx[34])) {
    				prop_dev(option, "__value", option_value_value);
    			}

    			option.value = option.__value;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(option);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1$1.name,
    		type: "each",
    		source: "(320:4) {#each teams as team}",
    		ctx
    	});

    	return block;
    }

    // (319:3) <Input type="select" name="selectTeam" id="selectTeam" bind:value="{currentTeam}">
    function create_default_slot_18$1(ctx) {
    	let t0;
    	let option;
    	let each_value_1 = /*teams*/ ctx[2];
    	validate_each_argument(each_value_1);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1$1(get_each_context_1$1(ctx, each_value_1, i));
    	}

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t0 = space();
    			option = element("option");
    			option.textContent = "-";
    			option.__value = "-";
    			option.value = option.__value;
    			add_location(option, file$c, 322, 4, 8570);
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, t0, anchor);
    			insert_dev(target, option, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*teams*/ 4) {
    				each_value_1 = /*teams*/ ctx[2];
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1$1(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_1$1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(t0.parentNode, t0);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value_1.length;
    			}
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(option);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_18$1.name,
    		type: "slot",
    		source: "(319:3) <Input type=\\\"select\\\" name=\\\"selectTeam\\\" id=\\\"selectTeam\\\" bind:value=\\\"{currentTeam}\\\">",
    		ctx
    	});

    	return block;
    }

    // (317:2) <FormGroup>
    function create_default_slot_17$1(ctx) {
    	let t;
    	let updating_value;
    	let current;

    	const label = new Label({
    			props: {
    				for: "selectTeam",
    				$$slots: { default: [create_default_slot_19$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	function input_value_binding_1(value) {
    		/*input_value_binding_1*/ ctx[20].call(null, value);
    	}

    	let input_props = {
    		type: "select",
    		name: "selectTeam",
    		id: "selectTeam",
    		$$slots: { default: [create_default_slot_18$1] },
    		$$scope: { ctx }
    	};

    	if (/*currentTeam*/ ctx[4] !== void 0) {
    		input_props.value = /*currentTeam*/ ctx[4];
    	}

    	const input = new Input({ props: input_props, $$inline: true });
    	binding_callbacks.push(() => bind(input, "value", input_value_binding_1));

    	const block = {
    		c: function create() {
    			create_component(label.$$.fragment);
    			t = space();
    			create_component(input.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(label, target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(input, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const label_changes = {};

    			if (dirty[1] & /*$$scope*/ 512) {
    				label_changes.$$scope = { dirty, ctx };
    			}

    			label.$set(label_changes);
    			const input_changes = {};

    			if (dirty[0] & /*teams*/ 4 | dirty[1] & /*$$scope*/ 512) {
    				input_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_value && dirty[0] & /*currentTeam*/ 16) {
    				updating_value = true;
    				input_changes.value = /*currentTeam*/ ctx[4];
    				add_flush_callback(() => updating_value = false);
    			}

    			input.$set(input_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(label.$$.fragment, local);
    			transition_in(input.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(label.$$.fragment, local);
    			transition_out(input.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(label, detaching);
    			if (detaching) detach_dev(t);
    			destroy_component(input, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_17$1.name,
    		type: "slot",
    		source: "(317:2) <FormGroup>",
    		ctx
    	});

    	return block;
    }

    // (327:2) <Button outline color="secondary" on:click="{search(currentYear, currentTeam)}" class="button-search" >
    function create_default_slot_16$1(ctx) {
    	let i;
    	let t;

    	const block = {
    		c: function create() {
    			i = element("i");
    			t = text(" Buscar");
    			attr_dev(i, "class", "fas fa-search");
    			add_location(i, file$c, 326, 106, 8727);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, i, anchor);
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(i);
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_16$1.name,
    		type: "slot",
    		source: "(327:2) <Button outline color=\\\"secondary\\\" on:click=\\\"{search(currentYear, currentTeam)}\\\" class=\\\"button-search\\\" >",
    		ctx
    	});

    	return block;
    }

    // (328:2) <Button color="success" on:click="{ReloadTable}"  on:click={ReloadTableAlert}>
    function create_default_slot_15$1(ctx) {
    	let i;
    	let t;

    	const block = {
    		c: function create() {
    			i = element("i");
    			t = text(" Carga Inicial API");
    			attr_dev(i, "class", "fa fa-refresh");
    			attr_dev(i, "aria-hidden", "true");
    			add_location(i, file$c, 327, 81, 8856);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, i, anchor);
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(i);
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_15$1.name,
    		type: "slot",
    		source: "(328:2) <Button color=\\\"success\\\" on:click=\\\"{ReloadTable}\\\"  on:click={ReloadTableAlert}>",
    		ctx
    	});

    	return block;
    }

    // (353:10) <Button outline  color="primary" on:click={insertTransfer}>
    function create_default_slot_14$1(ctx) {
    	let i;
    	let t;

    	const block = {
    		c: function create() {
    			i = element("i");
    			t = text(" Insertar");
    			attr_dev(i, "class", "fa fa-plus-circle");
    			attr_dev(i, "aria-hidden", "true");
    			add_location(i, file$c, 352, 70, 9650);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, i, anchor);
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(i);
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_14$1.name,
    		type: "slot",
    		source: "(353:10) <Button outline  color=\\\"primary\\\" on:click={insertTransfer}>",
    		ctx
    	});

    	return block;
    }

    // (364:10) <Button outline color="danger" on:click="{deleteTransfer(transfer.year,transfer.team)}">
    function create_default_slot_13$1(ctx) {
    	let i;
    	let t;

    	const block = {
    		c: function create() {
    			i = element("i");
    			t = text(" Eliminar");
    			attr_dev(i, "class", "fa fa-trash");
    			attr_dev(i, "aria-hidden", "true");
    			add_location(i, file$c, 363, 99, 10092);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, i, anchor);
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(i);
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_13$1.name,
    		type: "slot",
    		source: "(364:10) <Button outline color=\\\"danger\\\" on:click=\\\"{deleteTransfer(transfer.year,transfer.team)}\\\">",
    		ctx
    	});

    	return block;
    }

    // (365:10) <Button outline color="info" href="#/global-transfers/{transfer.year}/{transfer.team}">
    function create_default_slot_12$1(ctx) {
    	let i;
    	let t;

    	const block = {
    		c: function create() {
    			i = element("i");
    			t = text(" Editar");
    			attr_dev(i, "class", "fa fa-edit");
    			attr_dev(i, "aria-hidden", "true");
    			add_location(i, file$c, 364, 98, 10261);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, i, anchor);
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(i);
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_12$1.name,
    		type: "slot",
    		source: "(365:10) <Button outline color=\\\"info\\\" href=\\\"#/global-transfers/{transfer.year}/{transfer.team}\\\">",
    		ctx
    	});

    	return block;
    }

    // (356:4) {#each transfers as transfer}
    function create_each_block$1(ctx) {
    	let tr;
    	let td0;
    	let t0_value = /*transfer*/ ctx[31].country + "";
    	let t0;
    	let t1;
    	let td1;
    	let t2_value = /*transfer*/ ctx[31].year + "";
    	let t2;
    	let t3;
    	let td2;
    	let t4_value = /*transfer*/ ctx[31].team + "";
    	let t4;
    	let t5;
    	let td3;
    	let t6_value = /*transfer*/ ctx[31].signing + "";
    	let t6;
    	let t7;
    	let td4;
    	let t8_value = /*transfer*/ ctx[31].sale + "";
    	let t8;
    	let t9;
    	let td5;
    	let t10_value = /*transfer*/ ctx[31].balance + "";
    	let t10;
    	let t11;
    	let td6;
    	let t12;
    	let td7;
    	let t13;
    	let current;

    	const button0 = new Button({
    			props: {
    				outline: true,
    				color: "danger",
    				$$slots: { default: [create_default_slot_13$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button0.$on("click", function () {
    		if (is_function(/*deleteTransfer*/ ctx[10](/*transfer*/ ctx[31].year, /*transfer*/ ctx[31].team))) /*deleteTransfer*/ ctx[10](/*transfer*/ ctx[31].year, /*transfer*/ ctx[31].team).apply(this, arguments);
    	});

    	const button1 = new Button({
    			props: {
    				outline: true,
    				color: "info",
    				href: "#/global-transfers/" + /*transfer*/ ctx[31].year + "/" + /*transfer*/ ctx[31].team,
    				$$slots: { default: [create_default_slot_12$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			tr = element("tr");
    			td0 = element("td");
    			t0 = text(t0_value);
    			t1 = space();
    			td1 = element("td");
    			t2 = text(t2_value);
    			t3 = space();
    			td2 = element("td");
    			t4 = text(t4_value);
    			t5 = space();
    			td3 = element("td");
    			t6 = text(t6_value);
    			t7 = space();
    			td4 = element("td");
    			t8 = text(t8_value);
    			t9 = space();
    			td5 = element("td");
    			t10 = text(t10_value);
    			t11 = space();
    			td6 = element("td");
    			create_component(button0.$$.fragment);
    			t12 = space();
    			td7 = element("td");
    			create_component(button1.$$.fragment);
    			t13 = space();
    			add_location(td0, file$c, 357, 6, 9798);
    			add_location(td1, file$c, 358, 6, 9833);
    			add_location(td2, file$c, 359, 6, 9865);
    			add_location(td3, file$c, 360, 6, 9897);
    			add_location(td4, file$c, 361, 6, 9932);
    			add_location(td5, file$c, 362, 6, 9964);
    			add_location(td6, file$c, 363, 6, 9999);
    			add_location(td7, file$c, 364, 6, 10169);
    			add_location(tr, file$c, 356, 5, 9786);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, tr, anchor);
    			append_dev(tr, td0);
    			append_dev(td0, t0);
    			append_dev(tr, t1);
    			append_dev(tr, td1);
    			append_dev(td1, t2);
    			append_dev(tr, t3);
    			append_dev(tr, td2);
    			append_dev(td2, t4);
    			append_dev(tr, t5);
    			append_dev(tr, td3);
    			append_dev(td3, t6);
    			append_dev(tr, t7);
    			append_dev(tr, td4);
    			append_dev(td4, t8);
    			append_dev(tr, t9);
    			append_dev(tr, td5);
    			append_dev(td5, t10);
    			append_dev(tr, t11);
    			append_dev(tr, td6);
    			mount_component(button0, td6, null);
    			append_dev(tr, t12);
    			append_dev(tr, td7);
    			mount_component(button1, td7, null);
    			append_dev(tr, t13);
    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			if ((!current || dirty[0] & /*transfers*/ 128) && t0_value !== (t0_value = /*transfer*/ ctx[31].country + "")) set_data_dev(t0, t0_value);
    			if ((!current || dirty[0] & /*transfers*/ 128) && t2_value !== (t2_value = /*transfer*/ ctx[31].year + "")) set_data_dev(t2, t2_value);
    			if ((!current || dirty[0] & /*transfers*/ 128) && t4_value !== (t4_value = /*transfer*/ ctx[31].team + "")) set_data_dev(t4, t4_value);
    			if ((!current || dirty[0] & /*transfers*/ 128) && t6_value !== (t6_value = /*transfer*/ ctx[31].signing + "")) set_data_dev(t6, t6_value);
    			if ((!current || dirty[0] & /*transfers*/ 128) && t8_value !== (t8_value = /*transfer*/ ctx[31].sale + "")) set_data_dev(t8, t8_value);
    			if ((!current || dirty[0] & /*transfers*/ 128) && t10_value !== (t10_value = /*transfer*/ ctx[31].balance + "")) set_data_dev(t10, t10_value);
    			const button0_changes = {};

    			if (dirty[1] & /*$$scope*/ 512) {
    				button0_changes.$$scope = { dirty, ctx };
    			}

    			button0.$set(button0_changes);
    			const button1_changes = {};
    			if (dirty[0] & /*transfers*/ 128) button1_changes.href = "#/global-transfers/" + /*transfer*/ ctx[31].year + "/" + /*transfer*/ ctx[31].team;

    			if (dirty[1] & /*$$scope*/ 512) {
    				button1_changes.$$scope = { dirty, ctx };
    			}

    			button1.$set(button1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(button0.$$.fragment, local);
    			transition_in(button1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(button0.$$.fragment, local);
    			transition_out(button1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(tr);
    			destroy_component(button0);
    			destroy_component(button1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(356:4) {#each transfers as transfer}",
    		ctx
    	});

    	return block;
    }

    // (332:2) <Table bordered>
    function create_default_slot_11$1(ctx) {
    	let thead;
    	let tr0;
    	let th0;
    	let t1;
    	let th1;
    	let t3;
    	let th2;
    	let t5;
    	let th3;
    	let t7;
    	let th4;
    	let t9;
    	let th5;
    	let t11;
    	let th6;
    	let t13;
    	let tbody;
    	let tr1;
    	let td0;
    	let input0;
    	let t14;
    	let td1;
    	let input1;
    	let t15;
    	let td2;
    	let input2;
    	let t16;
    	let td3;
    	let input3;
    	let t17;
    	let td4;
    	let input4;
    	let t18;
    	let td5;
    	let input5;
    	let t19;
    	let td6;
    	let t20;
    	let current;
    	let dispose;

    	const button = new Button({
    			props: {
    				outline: true,
    				color: "primary",
    				$$slots: { default: [create_default_slot_14$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button.$on("click", /*insertTransfer*/ ctx[9]);
    	let each_value = /*transfers*/ ctx[7];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			thead = element("thead");
    			tr0 = element("tr");
    			th0 = element("th");
    			th0.textContent = "Pais";
    			t1 = space();
    			th1 = element("th");
    			th1.textContent = "Año";
    			t3 = space();
    			th2 = element("th");
    			th2.textContent = "Equipo";
    			t5 = space();
    			th3 = element("th");
    			th3.textContent = "Fichajes";
    			t7 = space();
    			th4 = element("th");
    			th4.textContent = "Ventas";
    			t9 = space();
    			th5 = element("th");
    			th5.textContent = "Balance";
    			t11 = space();
    			th6 = element("th");
    			th6.textContent = "Actions";
    			t13 = space();
    			tbody = element("tbody");
    			tr1 = element("tr");
    			td0 = element("td");
    			input0 = element("input");
    			t14 = space();
    			td1 = element("td");
    			input1 = element("input");
    			t15 = space();
    			td2 = element("td");
    			input2 = element("input");
    			t16 = space();
    			td3 = element("td");
    			input3 = element("input");
    			t17 = space();
    			td4 = element("td");
    			input4 = element("input");
    			t18 = space();
    			td5 = element("td");
    			input5 = element("input");
    			t19 = space();
    			td6 = element("td");
    			create_component(button.$$.fragment);
    			t20 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			add_location(th0, file$c, 334, 5, 8989);
    			add_location(th1, file$c, 335, 5, 9009);
    			add_location(th2, file$c, 336, 5, 9028);
    			add_location(th3, file$c, 337, 5, 9050);
    			add_location(th4, file$c, 338, 5, 9074);
    			add_location(th5, file$c, 339, 5, 9096);
    			add_location(th6, file$c, 340, 5, 9119);
    			add_location(tr0, file$c, 333, 4, 8978);
    			add_location(thead, file$c, 332, 3, 8965);
    			add_location(input0, file$c, 346, 9, 9194);
    			add_location(td0, file$c, 346, 5, 9190);
    			attr_dev(input1, "type", "number");
    			add_location(input1, file$c, 347, 9, 9252);
    			add_location(td1, file$c, 347, 5, 9248);
    			add_location(input2, file$c, 348, 9, 9321);
    			add_location(td2, file$c, 348, 5, 9317);
    			attr_dev(input3, "type", "number");
    			add_location(input3, file$c, 349, 9, 9376);
    			add_location(td3, file$c, 349, 5, 9372);
    			attr_dev(input4, "type", "number");
    			add_location(input4, file$c, 350, 9, 9448);
    			add_location(td4, file$c, 350, 5, 9444);
    			attr_dev(input5, "type", "number");
    			add_location(input5, file$c, 351, 9, 9517);
    			add_location(td5, file$c, 351, 5, 9513);
    			add_location(td6, file$c, 352, 5, 9585);
    			add_location(tr1, file$c, 345, 4, 9179);
    			add_location(tbody, file$c, 344, 3, 9166);
    		},
    		m: function mount(target, anchor, remount) {
    			insert_dev(target, thead, anchor);
    			append_dev(thead, tr0);
    			append_dev(tr0, th0);
    			append_dev(tr0, t1);
    			append_dev(tr0, th1);
    			append_dev(tr0, t3);
    			append_dev(tr0, th2);
    			append_dev(tr0, t5);
    			append_dev(tr0, th3);
    			append_dev(tr0, t7);
    			append_dev(tr0, th4);
    			append_dev(tr0, t9);
    			append_dev(tr0, th5);
    			append_dev(tr0, t11);
    			append_dev(tr0, th6);
    			insert_dev(target, t13, anchor);
    			insert_dev(target, tbody, anchor);
    			append_dev(tbody, tr1);
    			append_dev(tr1, td0);
    			append_dev(td0, input0);
    			set_input_value(input0, /*newTransfer*/ ctx[0].country);
    			append_dev(tr1, t14);
    			append_dev(tr1, td1);
    			append_dev(td1, input1);
    			set_input_value(input1, /*newTransfer*/ ctx[0].year);
    			append_dev(tr1, t15);
    			append_dev(tr1, td2);
    			append_dev(td2, input2);
    			set_input_value(input2, /*newTransfer*/ ctx[0].team);
    			append_dev(tr1, t16);
    			append_dev(tr1, td3);
    			append_dev(td3, input3);
    			set_input_value(input3, /*newTransfer*/ ctx[0].signing);
    			append_dev(tr1, t17);
    			append_dev(tr1, td4);
    			append_dev(td4, input4);
    			set_input_value(input4, /*newTransfer*/ ctx[0].sale);
    			append_dev(tr1, t18);
    			append_dev(tr1, td5);
    			append_dev(td5, input5);
    			set_input_value(input5, /*newTransfer*/ ctx[0].balance);
    			append_dev(tr1, t19);
    			append_dev(tr1, td6);
    			mount_component(button, td6, null);
    			append_dev(tbody, t20);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(tbody, null);
    			}

    			current = true;
    			if (remount) run_all(dispose);

    			dispose = [
    				listen_dev(input0, "input", /*input0_input_handler*/ ctx[21]),
    				listen_dev(input1, "input", /*input1_input_handler*/ ctx[22]),
    				listen_dev(input2, "input", /*input2_input_handler*/ ctx[23]),
    				listen_dev(input3, "input", /*input3_input_handler*/ ctx[24]),
    				listen_dev(input4, "input", /*input4_input_handler*/ ctx[25]),
    				listen_dev(input5, "input", /*input5_input_handler*/ ctx[26])
    			];
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*newTransfer*/ 1 && input0.value !== /*newTransfer*/ ctx[0].country) {
    				set_input_value(input0, /*newTransfer*/ ctx[0].country);
    			}

    			if (dirty[0] & /*newTransfer*/ 1 && to_number(input1.value) !== /*newTransfer*/ ctx[0].year) {
    				set_input_value(input1, /*newTransfer*/ ctx[0].year);
    			}

    			if (dirty[0] & /*newTransfer*/ 1 && input2.value !== /*newTransfer*/ ctx[0].team) {
    				set_input_value(input2, /*newTransfer*/ ctx[0].team);
    			}

    			if (dirty[0] & /*newTransfer*/ 1 && to_number(input3.value) !== /*newTransfer*/ ctx[0].signing) {
    				set_input_value(input3, /*newTransfer*/ ctx[0].signing);
    			}

    			if (dirty[0] & /*newTransfer*/ 1 && to_number(input4.value) !== /*newTransfer*/ ctx[0].sale) {
    				set_input_value(input4, /*newTransfer*/ ctx[0].sale);
    			}

    			if (dirty[0] & /*newTransfer*/ 1 && to_number(input5.value) !== /*newTransfer*/ ctx[0].balance) {
    				set_input_value(input5, /*newTransfer*/ ctx[0].balance);
    			}

    			const button_changes = {};

    			if (dirty[1] & /*$$scope*/ 512) {
    				button_changes.$$scope = { dirty, ctx };
    			}

    			button.$set(button_changes);

    			if (dirty[0] & /*transfers, deleteTransfer*/ 1152) {
    				each_value = /*transfers*/ ctx[7];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(tbody, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(button.$$.fragment, local);

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(button.$$.fragment, local);
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(thead);
    			if (detaching) detach_dev(t13);
    			if (detaching) detach_dev(tbody);
    			destroy_component(button);
    			destroy_each(each_blocks, detaching);
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_11$1.name,
    		type: "slot",
    		source: "(332:2) <Table bordered>",
    		ctx
    	});

    	return block;
    }

    // (303:19)     Loading transfers...   {:then transfers}
    function create_pending_block$2(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Loading transfers...");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_pending_block$2.name,
    		type: "pending",
    		source: "(303:19)     Loading transfers...   {:then transfers}",
    		ctx
    	});

    	return block;
    }

    // (376:2) <PaginationItem class="{currentPage === 1 ? 'disabled' : ''}">
    function create_default_slot_10$1(ctx) {
    	let current;

    	const paginationlink = new PaginationLink({
    			props: {
    				previous: true,
    				href: "#/globalTransfersAPI"
    			},
    			$$inline: true
    		});

    	paginationlink.$on("click", /*click_handler*/ ctx[27]);

    	const block = {
    		c: function create() {
    			create_component(paginationlink.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(paginationlink, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(paginationlink.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(paginationlink.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(paginationlink, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_10$1.name,
    		type: "slot",
    		source: "(376:2) <PaginationItem class=\\\"{currentPage === 1 ? 'disabled' : ''}\\\">",
    		ctx
    	});

    	return block;
    }

    // (380:2) {#if currentPage != 1}
    function create_if_block_1$3(ctx) {
    	let current;

    	const paginationitem = new PaginationItem({
    			props: {
    				$$slots: { default: [create_default_slot_8$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(paginationitem.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(paginationitem, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const paginationitem_changes = {};

    			if (dirty[0] & /*currentPage*/ 32 | dirty[1] & /*$$scope*/ 512) {
    				paginationitem_changes.$$scope = { dirty, ctx };
    			}

    			paginationitem.$set(paginationitem_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(paginationitem.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(paginationitem.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(paginationitem, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$3.name,
    		type: "if",
    		source: "(380:2) {#if currentPage != 1}",
    		ctx
    	});

    	return block;
    }

    // (382:3) <PaginationLink href="#/globalTransfersAPI" on:click="{() => addOffset(-1)}" >
    function create_default_slot_9$1(ctx) {
    	let t_value = /*currentPage*/ ctx[5] - 1 + "";
    	let t;

    	const block = {
    		c: function create() {
    			t = text(t_value);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*currentPage*/ 32 && t_value !== (t_value = /*currentPage*/ ctx[5] - 1 + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_9$1.name,
    		type: "slot",
    		source: "(382:3) <PaginationLink href=\\\"#/globalTransfersAPI\\\" on:click=\\\"{() => addOffset(-1)}\\\" >",
    		ctx
    	});

    	return block;
    }

    // (381:2) <PaginationItem>
    function create_default_slot_8$1(ctx) {
    	let current;

    	const paginationlink = new PaginationLink({
    			props: {
    				href: "#/globalTransfersAPI",
    				$$slots: { default: [create_default_slot_9$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	paginationlink.$on("click", /*click_handler_1*/ ctx[28]);

    	const block = {
    		c: function create() {
    			create_component(paginationlink.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(paginationlink, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const paginationlink_changes = {};

    			if (dirty[0] & /*currentPage*/ 32 | dirty[1] & /*$$scope*/ 512) {
    				paginationlink_changes.$$scope = { dirty, ctx };
    			}

    			paginationlink.$set(paginationlink_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(paginationlink.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(paginationlink.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(paginationlink, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_8$1.name,
    		type: "slot",
    		source: "(381:2) <PaginationItem>",
    		ctx
    	});

    	return block;
    }

    // (386:3) <PaginationLink href="#/globalTransfersAPI" >
    function create_default_slot_7$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text(/*currentPage*/ ctx[5]);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*currentPage*/ 32) set_data_dev(t, /*currentPage*/ ctx[5]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_7$1.name,
    		type: "slot",
    		source: "(386:3) <PaginationLink href=\\\"#/globalTransfersAPI\\\" >",
    		ctx
    	});

    	return block;
    }

    // (385:2) <PaginationItem active>
    function create_default_slot_6$1(ctx) {
    	let current;

    	const paginationlink = new PaginationLink({
    			props: {
    				href: "#/globalTransfersAPI",
    				$$slots: { default: [create_default_slot_7$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(paginationlink.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(paginationlink, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const paginationlink_changes = {};

    			if (dirty[0] & /*currentPage*/ 32 | dirty[1] & /*$$scope*/ 512) {
    				paginationlink_changes.$$scope = { dirty, ctx };
    			}

    			paginationlink.$set(paginationlink_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(paginationlink.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(paginationlink.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(paginationlink, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_6$1.name,
    		type: "slot",
    		source: "(385:2) <PaginationItem active>",
    		ctx
    	});

    	return block;
    }

    // (389:2) {#if moreData}
    function create_if_block$8(ctx) {
    	let current;

    	const paginationitem = new PaginationItem({
    			props: {
    				$$slots: { default: [create_default_slot_4$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(paginationitem.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(paginationitem, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const paginationitem_changes = {};

    			if (dirty[0] & /*currentPage*/ 32 | dirty[1] & /*$$scope*/ 512) {
    				paginationitem_changes.$$scope = { dirty, ctx };
    			}

    			paginationitem.$set(paginationitem_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(paginationitem.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(paginationitem.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(paginationitem, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$8.name,
    		type: "if",
    		source: "(389:2) {#if moreData}",
    		ctx
    	});

    	return block;
    }

    // (391:3) <PaginationLink href="#/globalTransfersAPI" on:click="{() => addOffset(1)}">
    function create_default_slot_5$1(ctx) {
    	let t_value = /*currentPage*/ ctx[5] + 1 + "";
    	let t;

    	const block = {
    		c: function create() {
    			t = text(t_value);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*currentPage*/ 32 && t_value !== (t_value = /*currentPage*/ ctx[5] + 1 + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_5$1.name,
    		type: "slot",
    		source: "(391:3) <PaginationLink href=\\\"#/globalTransfersAPI\\\" on:click=\\\"{() => addOffset(1)}\\\">",
    		ctx
    	});

    	return block;
    }

    // (390:2) <PaginationItem >
    function create_default_slot_4$1(ctx) {
    	let current;

    	const paginationlink = new PaginationLink({
    			props: {
    				href: "#/globalTransfersAPI",
    				$$slots: { default: [create_default_slot_5$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	paginationlink.$on("click", /*click_handler_2*/ ctx[29]);

    	const block = {
    		c: function create() {
    			create_component(paginationlink.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(paginationlink, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const paginationlink_changes = {};

    			if (dirty[0] & /*currentPage*/ 32 | dirty[1] & /*$$scope*/ 512) {
    				paginationlink_changes.$$scope = { dirty, ctx };
    			}

    			paginationlink.$set(paginationlink_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(paginationlink.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(paginationlink.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(paginationlink, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_4$1.name,
    		type: "slot",
    		source: "(390:2) <PaginationItem >",
    		ctx
    	});

    	return block;
    }

    // (395:2) <PaginationItem class="{moreData ? '' : 'disabled'}">
    function create_default_slot_3$1(ctx) {
    	let current;

    	const paginationlink = new PaginationLink({
    			props: { next: true, href: "#/globalTransfersAPI" },
    			$$inline: true
    		});

    	paginationlink.$on("click", /*click_handler_3*/ ctx[30]);

    	const block = {
    		c: function create() {
    			create_component(paginationlink.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(paginationlink, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(paginationlink.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(paginationlink.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(paginationlink, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3$1.name,
    		type: "slot",
    		source: "(395:2) <PaginationItem class=\\\"{moreData ? '' : 'disabled'}\\\">",
    		ctx
    	});

    	return block;
    }

    // (373:1) <Pagination style="float:right;" ariaLabel="Cambiar de página">
    function create_default_slot_2$2(ctx) {
    	let t0;
    	let t1;
    	let t2;
    	let t3;
    	let current;

    	const paginationitem0 = new PaginationItem({
    			props: {
    				class: /*currentPage*/ ctx[5] === 1 ? "disabled" : "",
    				$$slots: { default: [create_default_slot_10$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	let if_block0 = /*currentPage*/ ctx[5] != 1 && create_if_block_1$3(ctx);

    	const paginationitem1 = new PaginationItem({
    			props: {
    				active: true,
    				$$slots: { default: [create_default_slot_6$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	let if_block1 = /*moreData*/ ctx[6] && create_if_block$8(ctx);

    	const paginationitem2 = new PaginationItem({
    			props: {
    				class: /*moreData*/ ctx[6] ? "" : "disabled",
    				$$slots: { default: [create_default_slot_3$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(paginationitem0.$$.fragment);
    			t0 = space();
    			if (if_block0) if_block0.c();
    			t1 = space();
    			create_component(paginationitem1.$$.fragment);
    			t2 = space();
    			if (if_block1) if_block1.c();
    			t3 = space();
    			create_component(paginationitem2.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(paginationitem0, target, anchor);
    			insert_dev(target, t0, anchor);
    			if (if_block0) if_block0.m(target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(paginationitem1, target, anchor);
    			insert_dev(target, t2, anchor);
    			if (if_block1) if_block1.m(target, anchor);
    			insert_dev(target, t3, anchor);
    			mount_component(paginationitem2, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const paginationitem0_changes = {};
    			if (dirty[0] & /*currentPage*/ 32) paginationitem0_changes.class = /*currentPage*/ ctx[5] === 1 ? "disabled" : "";

    			if (dirty[1] & /*$$scope*/ 512) {
    				paginationitem0_changes.$$scope = { dirty, ctx };
    			}

    			paginationitem0.$set(paginationitem0_changes);

    			if (/*currentPage*/ ctx[5] != 1) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);

    					if (dirty[0] & /*currentPage*/ 32) {
    						transition_in(if_block0, 1);
    					}
    				} else {
    					if_block0 = create_if_block_1$3(ctx);
    					if_block0.c();
    					transition_in(if_block0, 1);
    					if_block0.m(t1.parentNode, t1);
    				}
    			} else if (if_block0) {
    				group_outros();

    				transition_out(if_block0, 1, 1, () => {
    					if_block0 = null;
    				});

    				check_outros();
    			}

    			const paginationitem1_changes = {};

    			if (dirty[0] & /*currentPage*/ 32 | dirty[1] & /*$$scope*/ 512) {
    				paginationitem1_changes.$$scope = { dirty, ctx };
    			}

    			paginationitem1.$set(paginationitem1_changes);

    			if (/*moreData*/ ctx[6]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);

    					if (dirty[0] & /*moreData*/ 64) {
    						transition_in(if_block1, 1);
    					}
    				} else {
    					if_block1 = create_if_block$8(ctx);
    					if_block1.c();
    					transition_in(if_block1, 1);
    					if_block1.m(t3.parentNode, t3);
    				}
    			} else if (if_block1) {
    				group_outros();

    				transition_out(if_block1, 1, 1, () => {
    					if_block1 = null;
    				});

    				check_outros();
    			}

    			const paginationitem2_changes = {};
    			if (dirty[0] & /*moreData*/ 64) paginationitem2_changes.class = /*moreData*/ ctx[6] ? "" : "disabled";

    			if (dirty[1] & /*$$scope*/ 512) {
    				paginationitem2_changes.$$scope = { dirty, ctx };
    			}

    			paginationitem2.$set(paginationitem2_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(paginationitem0.$$.fragment, local);
    			transition_in(if_block0);
    			transition_in(paginationitem1.$$.fragment, local);
    			transition_in(if_block1);
    			transition_in(paginationitem2.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(paginationitem0.$$.fragment, local);
    			transition_out(if_block0);
    			transition_out(paginationitem1.$$.fragment, local);
    			transition_out(if_block1);
    			transition_out(paginationitem2.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(paginationitem0, detaching);
    			if (detaching) detach_dev(t0);
    			if (if_block0) if_block0.d(detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(paginationitem1, detaching);
    			if (detaching) detach_dev(t2);
    			if (if_block1) if_block1.d(detaching);
    			if (detaching) detach_dev(t3);
    			destroy_component(paginationitem2, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2$2.name,
    		type: "slot",
    		source: "(373:1) <Pagination style=\\\"float:right;\\\" ariaLabel=\\\"Cambiar de página\\\">",
    		ctx
    	});

    	return block;
    }

    // (401:1) <Button outline color="secondary" on:click="{pop}">
    function create_default_slot_1$2(ctx) {
    	let i;
    	let t;

    	const block = {
    		c: function create() {
    			i = element("i");
    			t = text(" Atrás");
    			attr_dev(i, "class", "fas fa-arrow-circle-left");
    			add_location(i, file$c, 400, 53, 11404);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, i, anchor);
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(i);
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$2.name,
    		type: "slot",
    		source: "(401:1) <Button outline color=\\\"secondary\\\" on:click=\\\"{pop}\\\">",
    		ctx
    	});

    	return block;
    }

    // (402:1) <Button outline on:click={deleteGlobalTransfers} color="danger">
    function create_default_slot$2(ctx) {
    	let i;
    	let t;

    	const block = {
    		c: function create() {
    			i = element("i");
    			t = text(" Borrar todo");
    			attr_dev(i, "class", "fa fa-trash");
    			attr_dev(i, "aria-hidden", "true");
    			add_location(i, file$c, 401, 66, 11528);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, i, anchor);
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(i);
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$2.name,
    		type: "slot",
    		source: "(402:1) <Button outline on:click={deleteGlobalTransfers} color=\\\"danger\\\">",
    		ctx
    	});

    	return block;
    }

    function create_fragment$d(ctx) {
    	let main;
    	let div;
    	let t0;
    	let promise;
    	let t1;
    	let t2;
    	let t3;
    	let current;

    	let info = {
    		ctx,
    		current: null,
    		token: null,
    		pending: create_pending_block$2,
    		then: create_then_block$2,
    		catch: create_catch_block$2,
    		value: 7,
    		blocks: [,,,]
    	};

    	handle_promise(promise = /*transfers*/ ctx[7], info);

    	const pagination = new Pagination({
    			props: {
    				style: "float:right;",
    				ariaLabel: "Cambiar de página",
    				$$slots: { default: [create_default_slot_2$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const button0 = new Button({
    			props: {
    				outline: true,
    				color: "secondary",
    				$$slots: { default: [create_default_slot_1$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button0.$on("click", pop);

    	const button1 = new Button({
    			props: {
    				outline: true,
    				color: "danger",
    				$$slots: { default: [create_default_slot$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button1.$on("click", /*deleteGlobalTransfers*/ ctx[11]);

    	const block = {
    		c: function create() {
    			main = element("main");
    			div = element("div");
    			t0 = space();
    			info.block.c();
    			t1 = space();
    			create_component(pagination.$$.fragment);
    			t2 = space();
    			create_component(button0.$$.fragment);
    			t3 = space();
    			create_component(button1.$$.fragment);
    			attr_dev(div, "role", "alert");
    			attr_dev(div, "id", "div_alert");
    			set_style(div, "display", "none");
    			add_location(div, file$c, 300, 1, 7929);
    			add_location(main, file$c, 299, 0, 7920);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, div);
    			append_dev(main, t0);
    			info.block.m(main, info.anchor = null);
    			info.mount = () => main;
    			info.anchor = t1;
    			append_dev(main, t1);
    			mount_component(pagination, main, null);
    			append_dev(main, t2);
    			mount_component(button0, main, null);
    			append_dev(main, t3);
    			mount_component(button1, main, null);
    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			info.ctx = ctx;

    			if (dirty[0] & /*transfers*/ 128 && promise !== (promise = /*transfers*/ ctx[7]) && handle_promise(promise, info)) ; else {
    				const child_ctx = ctx.slice();
    				child_ctx[7] = info.resolved;
    				info.block.p(child_ctx, dirty);
    			}

    			const pagination_changes = {};

    			if (dirty[0] & /*moreData, currentPage*/ 96 | dirty[1] & /*$$scope*/ 512) {
    				pagination_changes.$$scope = { dirty, ctx };
    			}

    			pagination.$set(pagination_changes);
    			const button0_changes = {};

    			if (dirty[1] & /*$$scope*/ 512) {
    				button0_changes.$$scope = { dirty, ctx };
    			}

    			button0.$set(button0_changes);
    			const button1_changes = {};

    			if (dirty[1] & /*$$scope*/ 512) {
    				button1_changes.$$scope = { dirty, ctx };
    			}

    			button1.$set(button1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(info.block);
    			transition_in(pagination.$$.fragment, local);
    			transition_in(button0.$$.fragment, local);
    			transition_in(button1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			for (let i = 0; i < 3; i += 1) {
    				const block = info.blocks[i];
    				transition_out(block);
    			}

    			transition_out(pagination.$$.fragment, local);
    			transition_out(button0.$$.fragment, local);
    			transition_out(button1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			info.block.d();
    			info.token = null;
    			info = null;
    			destroy_component(pagination);
    			destroy_component(button0);
    			destroy_component(button1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$d.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function insertAlert$1() {
    	clearAlert$2();
    	var alert_element = document.getElementById("div_alert");
    	alert_element.style = "position: fixed; top: 0px; top: 2%; width: 90%;";
    	alert_element.className = "alert alert-dismissible in alert-success ";
    	alert_element.innerHTML = "<strong> Dato insertado</strong> Se ha insertado el dato correctamente";

    	setTimeout(
    		() => {
    			clearAlert$2();
    		},
    		3000
    	);
    }

    function deleteAlert$1() {
    	clearAlert$2();
    	var alert_element = document.getElementById("div_alert");
    	alert_element.style = "position: fixed; top: 0px; top: 2%; width: 90%;";
    	alert_element.className = "alert alert-dismissible in alert-danger ";
    	alert_element.innerHTML = "<strong> Dato borrado</strong> Se ha borrado el dato correctamente";

    	setTimeout(
    		() => {
    			clearAlert$2();
    		},
    		3000
    	);
    }

    function deleteAllAlert$1() {
    	clearAlert$2();
    	var alert_element = document.getElementById("div_alert");
    	alert_element.style = "position: fixed; top: 0px; top: 2%; width: 90%;";
    	alert_element.className = "alert alert-dismissible in alert-danger ";
    	alert_element.innerHTML = "<strong> Datos borrados</strong> Se han borrado todos los datos correctamente";

    	setTimeout(
    		() => {
    			clearAlert$2();
    		},
    		3000
    	);
    }

    function ReloadTableAlert$1() {
    	clearAlert$2();
    	var alert_element = document.getElementById("div_alert");
    	alert_element.style = "position: fixed; top: 0px; top: 2%; width: 90%;";
    	alert_element.className = "alert alert-dismissible in alert-info ";
    	alert_element.innerHTML = "<strong> Tabla Restaurada</strong> Se han cargado los datos iniciales";

    	setTimeout(
    		() => {
    			clearAlert$2();
    		},
    		3000
    	);
    }

    function errorAlert$2(error) {
    	clearAlert$2();
    	var alert_element = document.getElementById("div_alert");
    	alert_element.style = "position: fixed; top: 0px; top: 2%; width: 90%;";
    	alert_element.className = "alert alert-dismissible in alert-danger ";
    	alert_element.innerHTML = "<strong> Error</strong> Ha ocurrido un error " + error;

    	setTimeout(
    		() => {
    			clearAlert$2();
    		},
    		3000
    	);
    }

    function clearAlert$2() {
    	var alert_element = document.getElementById("div_alert");
    	alert_element.style = "display: none; ";
    	alert_element.className = "alert alert-dismissible in";
    	alert_element.innerHTML = "";
    }

    function instance$d($$self, $$props, $$invalidate) {
    	let transfers = [];

    	let newTransfer = {
    		country: "",
    		year: parseInt(""),
    		team: "",
    		signing: "",
    		sale: "",
    		balance: ""
    	};

    	let BASE_API_URL = "/api/v2";
    	let years = [];
    	let teams = [];
    	let currentYear = "-";
    	let currentTeam = "-";
    	let numberElementsPages = 10;
    	let offset = 0;
    	let currentPage = 1;
    	let moreData = true;
    	onMount(getTransfers);
    	onMount(getYearsTeams);

    	async function ReloadTable() {
    		const res = await fetch(BASE_API_URL + "/global-transfers/loadInitialData");

    		if (res.ok) {
    			const initialTransfers = await res.json();
    			console.log("Contados " + initialTransfers.length + " datos de transferencias de fichajes");
    			getTransfers();
    		} else {
    			console.log("No se han cargado correctamente los datos inicales");
    		}
    	}

    	async function getYearsTeams() {
    		const res = await fetch(BASE_API_URL + "/global-transfers");

    		if (res.ok) {
    			const json = await res.json();

    			$$invalidate(1, years = json.map(d => {
    				return d.year; //Guardamos los años en un array
    			}));

    			$$invalidate(1, years = Array.from(new Set(years))); //Eliminamos años repetidos

    			$$invalidate(2, teams = json.map(d => {
    				return d.team; //Guardamos los equipos 
    			}));

    			$$invalidate(2, teams = Array.from(new Set(teams))); //Eliminamos los duplicados
    			console.log("Contados " + years.length + "años y " + teams.length + "años distintos.");
    		} else {
    			console.log("Error");
    		}
    	}

    	async function getTransfers() {
    		console.log("Fetching transfers...");
    		const res = await fetch(BASE_API_URL + "/global-transfers?offset=" + numberElementsPages * offset + "&limit=" + numberElementsPages);

    		if (res.ok) {
    			console.log("Ok:");
    			const json = await res.json();
    			$$invalidate(7, transfers = json);
    			console.log("Received " + transfers.length + " transfers.");

    			if (transfers.length != 10) {
    				$$invalidate(6, moreData = false);
    			} else {
    				const next = await fetch(BASE_API_URL + "/global-transfers?offset=" + numberElementsPages * (offset + 1) + "&limit=" + numberElementsPages);
    				console.log("La variable NEXT tiene el estado: " + next.status);
    				const jsonNext = await next.json();

    				if (jsonNext.length == 0 || next.status == 404) {
    					$$invalidate(6, moreData = false);
    				} else {
    					$$invalidate(6, moreData = true); //Vemos si quedan aun mas datos en la siguiente pagina
    				}
    			}
    		} else {
    			console.log("Error");
    		}
    	}

    	async function insertTransfer() {
    		console.log("Inserting transfer..." + JSON.stringify(newTransfer));

    		if (newTransfer.year == "" || newTransfer.year == null || newTransfer.team == "" || newTransfer.team == null) {
    			alert("Se debe incluir el año y el equipo vinculante obligatoriamente");
    		} else {
    			const res = await fetch(BASE_API_URL + "/global-transfers", {
    				method: "POST",
    				body: JSON.stringify(newTransfer),
    				headers: { "Content-Type": "application/json" }
    			}).then(function (res) {
    				if (res.ok) {
    					getTransfers();
    					insertAlert$1();
    					$$invalidate(0, newTransfer.country = "", newTransfer);
    					$$invalidate(0, newTransfer.year = "", newTransfer);
    					$$invalidate(0, newTransfer.team = "", newTransfer);
    					$$invalidate(0, newTransfer.signing = "", newTransfer);
    					$$invalidate(0, newTransfer.sale = "", newTransfer);
    					$$invalidate(0, newTransfer.balance = "", newTransfer);
    				} else {
    					errorAlert$2("Error interno al intentar insertar el elemento");
    				}
    			});
    		}
    	}

    	async function deleteTransfer(year, team) {
    		console.log("Deleting transfer..." + JSON.stringify(year) + +JSON.stringify(team));

    		const res = await fetch(BASE_API_URL + "/global-transfers/" + year + "/" + team, { method: "DELETE" }).then(function (res) {
    			if (res.ok) {
    				getTransfers();
    				getYearsTeams();
    				deleteAlert$1();
    			} else if (res.status == 404) {
    				errorAlert$2("El elemento que intentas borrar no existe");
    			} else {
    				errorAlert$2("Error al intentar borrar un elemento");
    			}
    		});
    	}

    	async function deleteGlobalTransfers() {
    		console.log("Deleting all transfers data...");

    		const res = await fetch(BASE_API_URL + "/global-transfers/", { method: "DELETE" }).then(function (res) {
    			if (res.ok) {
    				getTransfers();
    				getYearsTeams();
    				deleteAllAlert$1();
    			} else {
    				errorAlert$2("Error al borrar todos los elementos");
    			}
    		});
    	}

    	async function search(year, team) {
    		console.log("Searching data: " + year + " and " + team);

    		/* Checking if the fields are empty */
    		var url = BASE_API_URL + "/global-transfers";

    		if (year != "-" && team != "-") {
    			url = url + "?year=" + year + "&team=" + team;
    		} else if (year != "-" && team == "-") {
    			url = url + "?year=" + year;
    		} else if (year == "-" && team != "-") {
    			url = url + "?team=" + team;
    		}

    		const res = await fetch(url);

    		if (res.ok) {
    			console.log("Ok:");
    			const json = await res.json();
    			$$invalidate(7, transfers = json);
    			console.log("Found " + transfers.length + " global transfers stats.");
    		} else {
    			console.log("Error");
    		}
    	}

    	function addOffset(increment) {
    		offset += increment;
    		$$invalidate(5, currentPage += increment);
    		getTransfers();
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1$4.warn(`<TransfersTable> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("TransfersTable", $$slots, []);

    	function input_value_binding(value) {
    		currentYear = value;
    		$$invalidate(3, currentYear);
    	}

    	function input_value_binding_1(value) {
    		currentTeam = value;
    		$$invalidate(4, currentTeam);
    	}

    	function input0_input_handler() {
    		newTransfer.country = this.value;
    		$$invalidate(0, newTransfer);
    	}

    	function input1_input_handler() {
    		newTransfer.year = to_number(this.value);
    		$$invalidate(0, newTransfer);
    	}

    	function input2_input_handler() {
    		newTransfer.team = this.value;
    		$$invalidate(0, newTransfer);
    	}

    	function input3_input_handler() {
    		newTransfer.signing = to_number(this.value);
    		$$invalidate(0, newTransfer);
    	}

    	function input4_input_handler() {
    		newTransfer.sale = to_number(this.value);
    		$$invalidate(0, newTransfer);
    	}

    	function input5_input_handler() {
    		newTransfer.balance = to_number(this.value);
    		$$invalidate(0, newTransfer);
    	}

    	const click_handler = () => addOffset(-1);
    	const click_handler_1 = () => addOffset(-1);
    	const click_handler_2 = () => addOffset(1);
    	const click_handler_3 = () => addOffset(1);

    	$$self.$capture_state = () => ({
    		onMount,
    		pop,
    		Table,
    		Button,
    		Input,
    		Label,
    		FormGroup,
    		Pagination,
    		PaginationItem,
    		PaginationLink,
    		transfers,
    		newTransfer,
    		BASE_API_URL,
    		years,
    		teams,
    		currentYear,
    		currentTeam,
    		numberElementsPages,
    		offset,
    		currentPage,
    		moreData,
    		ReloadTable,
    		getYearsTeams,
    		getTransfers,
    		insertTransfer,
    		deleteTransfer,
    		deleteGlobalTransfers,
    		search,
    		addOffset,
    		insertAlert: insertAlert$1,
    		deleteAlert: deleteAlert$1,
    		deleteAllAlert: deleteAllAlert$1,
    		ReloadTableAlert: ReloadTableAlert$1,
    		errorAlert: errorAlert$2,
    		clearAlert: clearAlert$2
    	});

    	$$self.$inject_state = $$props => {
    		if ("transfers" in $$props) $$invalidate(7, transfers = $$props.transfers);
    		if ("newTransfer" in $$props) $$invalidate(0, newTransfer = $$props.newTransfer);
    		if ("BASE_API_URL" in $$props) BASE_API_URL = $$props.BASE_API_URL;
    		if ("years" in $$props) $$invalidate(1, years = $$props.years);
    		if ("teams" in $$props) $$invalidate(2, teams = $$props.teams);
    		if ("currentYear" in $$props) $$invalidate(3, currentYear = $$props.currentYear);
    		if ("currentTeam" in $$props) $$invalidate(4, currentTeam = $$props.currentTeam);
    		if ("numberElementsPages" in $$props) numberElementsPages = $$props.numberElementsPages;
    		if ("offset" in $$props) offset = $$props.offset;
    		if ("currentPage" in $$props) $$invalidate(5, currentPage = $$props.currentPage);
    		if ("moreData" in $$props) $$invalidate(6, moreData = $$props.moreData);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		newTransfer,
    		years,
    		teams,
    		currentYear,
    		currentTeam,
    		currentPage,
    		moreData,
    		transfers,
    		ReloadTable,
    		insertTransfer,
    		deleteTransfer,
    		deleteGlobalTransfers,
    		search,
    		addOffset,
    		offset,
    		BASE_API_URL,
    		numberElementsPages,
    		getYearsTeams,
    		getTransfers,
    		input_value_binding,
    		input_value_binding_1,
    		input0_input_handler,
    		input1_input_handler,
    		input2_input_handler,
    		input3_input_handler,
    		input4_input_handler,
    		input5_input_handler,
    		click_handler,
    		click_handler_1,
    		click_handler_2,
    		click_handler_3
    	];
    }

    class TransfersTable extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$d, create_fragment$d, safe_not_equal, {}, [-1, -1]);

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "TransfersTable",
    			options,
    			id: create_fragment$d.name
    		});
    	}
    }

    /* src\front\TransfersGUI\App.svelte generated by Svelte v3.21.0 */
    const file$d = "src\\front\\TransfersGUI\\App.svelte";

    function create_fragment$e(ctx) {
    	let main;
    	let h1;
    	let t1;
    	let current;
    	const transferstable = new TransfersTable({ $$inline: true });

    	const block = {
    		c: function create() {
    			main = element("main");
    			h1 = element("h1");
    			h1.textContent = "Administrador de datos de transferencias";
    			t1 = space();
    			create_component(transferstable.$$.fragment);
    			attr_dev(h1, "class", "display-4");
    			set_style(h1, "text-align", "center");
    			add_location(h1, file$d, 5, 1, 88);
    			add_location(main, file$d, 4, 0, 79);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, h1);
    			append_dev(main, t1);
    			mount_component(transferstable, main, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(transferstable.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(transferstable.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_component(transferstable);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$e.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$e($$self, $$props, $$invalidate) {
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("App", $$slots, []);
    	$$self.$capture_state = () => ({ TransfersTable });
    	return [];
    }

    class App$1 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$e, create_fragment$e, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment$e.name
    		});
    	}
    }

    /* src\front\TransfersGUI\EditTransfer.svelte generated by Svelte v3.21.0 */

    const { console: console_1$5 } = globals;
    const file$e = "src\\front\\TransfersGUI\\EditTransfer.svelte";

    // (1:0) <script>      import {          onMount      }
    function create_catch_block$3(ctx) {
    	const block = {
    		c: noop,
    		m: noop,
    		p: noop,
    		i: noop,
    		o: noop,
    		d: noop
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_catch_block$3.name,
    		type: "catch",
    		source: "(1:0) <script>      import {          onMount      }",
    		ctx
    	});

    	return block;
    }

    // (121:4) {:then transfer}
    function create_then_block$3(ctx) {
    	let current;

    	const table = new Table({
    			props: {
    				bordered: true,
    				$$slots: { default: [create_default_slot_1$3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(table.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(table, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const table_changes = {};

    			if (dirty & /*$$scope, updatedBalance, updatedSale, updatedSigning, updatedTeam, updatedYear, updatedCountry*/ 65662) {
    				table_changes.$$scope = { dirty, ctx };
    			}

    			table.$set(table_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(table.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(table.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(table, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_then_block$3.name,
    		type: "then",
    		source: "(121:4) {:then transfer}",
    		ctx
    	});

    	return block;
    }

    // (142:25) <Button outline  color="primary" on:click={updateTransfer}>
    function create_default_slot_2$3(ctx) {
    	let i;
    	let t;

    	const block = {
    		c: function create() {
    			i = element("i");
    			t = text(" Actualizar");
    			attr_dev(i, "class", "fa fa-refresh");
    			attr_dev(i, "aria-hidden", "true");
    			add_location(i, file$e, 141, 85, 4650);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, i, anchor);
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(i);
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2$3.name,
    		type: "slot",
    		source: "(142:25) <Button outline  color=\\\"primary\\\" on:click={updateTransfer}>",
    		ctx
    	});

    	return block;
    }

    // (122:8) <Table bordered>
    function create_default_slot_1$3(ctx) {
    	let thead;
    	let tr0;
    	let th0;
    	let t1;
    	let th1;
    	let t3;
    	let th2;
    	let t5;
    	let th3;
    	let t7;
    	let th4;
    	let t9;
    	let th5;
    	let t11;
    	let th6;
    	let t13;
    	let tbody;
    	let tr1;
    	let td0;
    	let input0;
    	let t14;
    	let td1;
    	let t15;
    	let t16;
    	let td2;
    	let t17;
    	let t18;
    	let td3;
    	let input1;
    	let t19;
    	let td4;
    	let input2;
    	let t20;
    	let td5;
    	let input3;
    	let t21;
    	let td6;
    	let current;
    	let dispose;

    	const button = new Button({
    			props: {
    				outline: true,
    				color: "primary",
    				$$slots: { default: [create_default_slot_2$3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button.$on("click", /*updateTransfer*/ ctx[9]);

    	const block = {
    		c: function create() {
    			thead = element("thead");
    			tr0 = element("tr");
    			th0 = element("th");
    			th0.textContent = "Pais";
    			t1 = space();
    			th1 = element("th");
    			th1.textContent = "Año";
    			t3 = space();
    			th2 = element("th");
    			th2.textContent = "Equipo";
    			t5 = space();
    			th3 = element("th");
    			th3.textContent = "Fichajes";
    			t7 = space();
    			th4 = element("th");
    			th4.textContent = "Ventas";
    			t9 = space();
    			th5 = element("th");
    			th5.textContent = "Balance Final";
    			t11 = space();
    			th6 = element("th");
    			th6.textContent = "Actions";
    			t13 = space();
    			tbody = element("tbody");
    			tr1 = element("tr");
    			td0 = element("td");
    			input0 = element("input");
    			t14 = space();
    			td1 = element("td");
    			t15 = text(/*updatedYear*/ ctx[2]);
    			t16 = space();
    			td2 = element("td");
    			t17 = text(/*updatedTeam*/ ctx[3]);
    			t18 = space();
    			td3 = element("td");
    			input1 = element("input");
    			t19 = space();
    			td4 = element("td");
    			input2 = element("input");
    			t20 = space();
    			td5 = element("td");
    			input3 = element("input");
    			t21 = space();
    			td6 = element("td");
    			create_component(button.$$.fragment);
    			add_location(th0, file$e, 124, 20, 3834);
    			add_location(th1, file$e, 125, 20, 3869);
    			add_location(th2, file$e, 126, 20, 3903);
    			add_location(th3, file$e, 127, 20, 3940);
    			add_location(th4, file$e, 128, 20, 3979);
    			add_location(th5, file$e, 129, 20, 4016);
    			add_location(th6, file$e, 130, 20, 4060);
    			add_location(tr0, file$e, 123, 16, 3808);
    			add_location(thead, file$e, 122, 12, 3783);
    			add_location(input0, file$e, 135, 24, 4190);
    			add_location(td0, file$e, 135, 20, 4186);
    			add_location(td1, file$e, 136, 20, 4254);
    			add_location(td2, file$e, 137, 20, 4298);
    			attr_dev(input1, "type", "number");
    			add_location(input1, file$e, 138, 24, 4346);
    			add_location(td3, file$e, 138, 20, 4342);
    			attr_dev(input2, "type", "number");
    			add_location(input2, file$e, 139, 24, 4428);
    			add_location(td4, file$e, 139, 20, 4424);
    			attr_dev(input3, "type", "number");
    			add_location(input3, file$e, 140, 24, 4507);
    			add_location(td5, file$e, 140, 20, 4503);
    			add_location(td6, file$e, 141, 20, 4585);
    			add_location(tr1, file$e, 134, 16, 4160);
    			add_location(tbody, file$e, 133, 12, 4135);
    		},
    		m: function mount(target, anchor, remount) {
    			insert_dev(target, thead, anchor);
    			append_dev(thead, tr0);
    			append_dev(tr0, th0);
    			append_dev(tr0, t1);
    			append_dev(tr0, th1);
    			append_dev(tr0, t3);
    			append_dev(tr0, th2);
    			append_dev(tr0, t5);
    			append_dev(tr0, th3);
    			append_dev(tr0, t7);
    			append_dev(tr0, th4);
    			append_dev(tr0, t9);
    			append_dev(tr0, th5);
    			append_dev(tr0, t11);
    			append_dev(tr0, th6);
    			insert_dev(target, t13, anchor);
    			insert_dev(target, tbody, anchor);
    			append_dev(tbody, tr1);
    			append_dev(tr1, td0);
    			append_dev(td0, input0);
    			set_input_value(input0, /*updatedCountry*/ ctx[1]);
    			append_dev(tr1, t14);
    			append_dev(tr1, td1);
    			append_dev(td1, t15);
    			append_dev(tr1, t16);
    			append_dev(tr1, td2);
    			append_dev(td2, t17);
    			append_dev(tr1, t18);
    			append_dev(tr1, td3);
    			append_dev(td3, input1);
    			set_input_value(input1, /*updatedSigning*/ ctx[4]);
    			append_dev(tr1, t19);
    			append_dev(tr1, td4);
    			append_dev(td4, input2);
    			set_input_value(input2, /*updatedSale*/ ctx[5]);
    			append_dev(tr1, t20);
    			append_dev(tr1, td5);
    			append_dev(td5, input3);
    			set_input_value(input3, /*updatedBalance*/ ctx[6]);
    			append_dev(tr1, t21);
    			append_dev(tr1, td6);
    			mount_component(button, td6, null);
    			current = true;
    			if (remount) run_all(dispose);

    			dispose = [
    				listen_dev(input0, "input", /*input0_input_handler*/ ctx[12]),
    				listen_dev(input1, "input", /*input1_input_handler*/ ctx[13]),
    				listen_dev(input2, "input", /*input2_input_handler*/ ctx[14]),
    				listen_dev(input3, "input", /*input3_input_handler*/ ctx[15])
    			];
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*updatedCountry*/ 2 && input0.value !== /*updatedCountry*/ ctx[1]) {
    				set_input_value(input0, /*updatedCountry*/ ctx[1]);
    			}

    			if (!current || dirty & /*updatedYear*/ 4) set_data_dev(t15, /*updatedYear*/ ctx[2]);
    			if (!current || dirty & /*updatedTeam*/ 8) set_data_dev(t17, /*updatedTeam*/ ctx[3]);

    			if (dirty & /*updatedSigning*/ 16 && to_number(input1.value) !== /*updatedSigning*/ ctx[4]) {
    				set_input_value(input1, /*updatedSigning*/ ctx[4]);
    			}

    			if (dirty & /*updatedSale*/ 32 && to_number(input2.value) !== /*updatedSale*/ ctx[5]) {
    				set_input_value(input2, /*updatedSale*/ ctx[5]);
    			}

    			if (dirty & /*updatedBalance*/ 64 && to_number(input3.value) !== /*updatedBalance*/ ctx[6]) {
    				set_input_value(input3, /*updatedBalance*/ ctx[6]);
    			}

    			const button_changes = {};

    			if (dirty & /*$$scope*/ 65536) {
    				button_changes.$$scope = { dirty, ctx };
    			}

    			button.$set(button_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(button.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(button.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(thead);
    			if (detaching) detach_dev(t13);
    			if (detaching) detach_dev(tbody);
    			destroy_component(button);
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$3.name,
    		type: "slot",
    		source: "(122:8) <Table bordered>",
    		ctx
    	});

    	return block;
    }

    // (119:21)           Cargando transfers...      {:then transfer}
    function create_pending_block$3(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Cargando transfers...");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_pending_block$3.name,
    		type: "pending",
    		source: "(119:21)           Cargando transfers...      {:then transfer}",
    		ctx
    	});

    	return block;
    }

    // (147:4) {#if errorMsg}
    function create_if_block$9(ctx) {
    	let p;
    	let t0;
    	let t1;

    	const block = {
    		c: function create() {
    			p = element("p");
    			t0 = text("ERROR: ");
    			t1 = text(/*errorMsg*/ ctx[7]);
    			set_style(p, "color", "red");
    			add_location(p, file$e, 147, 8, 4827);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			append_dev(p, t0);
    			append_dev(p, t1);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*errorMsg*/ 128) set_data_dev(t1, /*errorMsg*/ ctx[7]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$9.name,
    		type: "if",
    		source: "(147:4) {#if errorMsg}",
    		ctx
    	});

    	return block;
    }

    // (150:4) <Button outline color="secondary" on:click="{pop}">
    function create_default_slot$3(ctx) {
    	let i;
    	let t;

    	const block = {
    		c: function create() {
    			i = element("i");
    			t = text(" Atrás");
    			attr_dev(i, "class", "fas fa-arrow-circle-left");
    			add_location(i, file$e, 149, 56, 4939);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, i, anchor);
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(i);
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$3.name,
    		type: "slot",
    		source: "(150:4) <Button outline color=\\\"secondary\\\" on:click=\\\"{pop}\\\">",
    		ctx
    	});

    	return block;
    }

    function create_fragment$f(ctx) {
    	let main;
    	let div;
    	let t0;
    	let h3;
    	let t1;
    	let strong;
    	let t2_value = /*params*/ ctx[0].team + "";
    	let t2;
    	let t3;
    	let t4_value = /*params*/ ctx[0].year + "";
    	let t4;
    	let t5;
    	let promise;
    	let t6;
    	let t7;
    	let current;

    	let info = {
    		ctx,
    		current: null,
    		token: null,
    		pending: create_pending_block$3,
    		then: create_then_block$3,
    		catch: create_catch_block$3,
    		value: 8,
    		blocks: [,,,]
    	};

    	handle_promise(promise = /*transfer*/ ctx[8], info);
    	let if_block = /*errorMsg*/ ctx[7] && create_if_block$9(ctx);

    	const button = new Button({
    			props: {
    				outline: true,
    				color: "secondary",
    				$$slots: { default: [create_default_slot$3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button.$on("click", pop);

    	const block = {
    		c: function create() {
    			main = element("main");
    			div = element("div");
    			t0 = space();
    			h3 = element("h3");
    			t1 = text("Editar Transfer ");
    			strong = element("strong");
    			t2 = text(t2_value);
    			t3 = text(" : ");
    			t4 = text(t4_value);
    			t5 = space();
    			info.block.c();
    			t6 = space();
    			if (if_block) if_block.c();
    			t7 = space();
    			create_component(button.$$.fragment);
    			attr_dev(div, "role", "alert");
    			attr_dev(div, "id", "div_alert");
    			set_style(div, "display", "none");
    			add_location(div, file$e, 115, 4, 3525);
    			add_location(strong, file$e, 117, 24, 3616);
    			add_location(h3, file$e, 117, 4, 3596);
    			add_location(main, file$e, 114, 0, 3513);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, div);
    			append_dev(main, t0);
    			append_dev(main, h3);
    			append_dev(h3, t1);
    			append_dev(h3, strong);
    			append_dev(strong, t2);
    			append_dev(strong, t3);
    			append_dev(strong, t4);
    			append_dev(main, t5);
    			info.block.m(main, info.anchor = null);
    			info.mount = () => main;
    			info.anchor = t6;
    			append_dev(main, t6);
    			if (if_block) if_block.m(main, null);
    			append_dev(main, t7);
    			mount_component(button, main, null);
    			current = true;
    		},
    		p: function update(new_ctx, [dirty]) {
    			ctx = new_ctx;
    			if ((!current || dirty & /*params*/ 1) && t2_value !== (t2_value = /*params*/ ctx[0].team + "")) set_data_dev(t2, t2_value);
    			if ((!current || dirty & /*params*/ 1) && t4_value !== (t4_value = /*params*/ ctx[0].year + "")) set_data_dev(t4, t4_value);
    			info.ctx = ctx;

    			if (dirty & /*transfer*/ 256 && promise !== (promise = /*transfer*/ ctx[8]) && handle_promise(promise, info)) ; else {
    				const child_ctx = ctx.slice();
    				child_ctx[8] = info.resolved;
    				info.block.p(child_ctx, dirty);
    			}

    			if (/*errorMsg*/ ctx[7]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$9(ctx);
    					if_block.c();
    					if_block.m(main, t7);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			const button_changes = {};

    			if (dirty & /*$$scope*/ 65536) {
    				button_changes.$$scope = { dirty, ctx };
    			}

    			button.$set(button_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(info.block);
    			transition_in(button.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			for (let i = 0; i < 3; i += 1) {
    				const block = info.blocks[i];
    				transition_out(block);
    			}

    			transition_out(button.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			info.block.d();
    			info.token = null;
    			info = null;
    			if (if_block) if_block.d();
    			destroy_component(button);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$f.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function errorAlert$3(error) {
    	clearAlert$3();
    	var alert_element = document.getElementById("div_alert");
    	alert_element.style = "position: fixed; top: 0px; top: 2%; width: 90%;";
    	alert_element.className = "alert alert-dismissible in alert-danger ";
    	alert_element.innerHTML = "<strong>Error</strong> Ha ocurrido un error " + error;

    	setTimeout(
    		() => {
    			clearAlert$3();
    		},
    		3000
    	);
    }

    function updateAlert$1() {
    	clearAlert$3();
    	var alert_element = document.getElementById("div_alert");
    	alert_element.style = "position: fixed; top: 0px; top: 2%; width: 90%;";
    	alert_element.className = "alert alert-dismissible in alert-info ";
    	alert_element.innerHTML = "<strong>Dato actualizado</strong> Se ha actualizado el dato correctamente";

    	setTimeout(
    		() => {
    			clearAlert$3();
    		},
    		3000
    	);
    }

    function clearAlert$3() {
    	var alert_element = document.getElementById("div_alert");
    	alert_element.style = "display: none; ";
    	alert_element.className = "alert alert-dismissible in";
    	alert_element.innerHTML = "";
    }

    function instance$f($$self, $$props, $$invalidate) {
    	let { params = {} } = $$props;
    	let BASE_API_URL = "/api/v2";
    	let transfer = {};
    	let updatedCountry = "XXXX";
    	let updatedYear = 12345;
    	let updatedTeam = "SevillaFC";
    	let updatedSigning = 17;
    	let updatedSale = 32;
    	let updatedBalance = +108.2;
    	let errorMsg = "";
    	onMount(getTransfer);

    	async function getTransfer() {
    		console.log("Fetching transfer...");
    		const res = await fetch(BASE_API_URL + "/global-transfers/" + params.year + "/" + params.team);

    		if (res.ok) {
    			console.log("Ok:");
    			const json = await res.json();
    			$$invalidate(8, transfer = json);
    			$$invalidate(1, updatedCountry = transfer.country);
    			$$invalidate(2, updatedYear = transfer.year);
    			$$invalidate(3, updatedTeam = transfer.team);
    			$$invalidate(4, updatedSigning = transfer.signing);
    			$$invalidate(5, updatedSale = transfer.sale);
    			$$invalidate(6, updatedBalance = transfer.balance);
    			console.log("Received transfer");
    		} else {
    			$$invalidate(7, errorMsg = res.status + ": " + res.statusText);
    			console.log("Error" + errorMsg);
    		}
    	}

    	async function updateTransfer() {
    		console.log("Updating transfer..." + JSON.stringify(params.year));

    		const res = await fetch(BASE_API_URL + "/global-transfers/" + params.year + "/" + params.team, {
    			method: "PUT",
    			body: JSON.stringify({
    				country: updatedCountry,
    				year: parseInt(params.year),
    				team: params.team,
    				signing: updatedSigning,
    				sale: updatedSale,
    				balance: updatedBalance
    			}),
    			headers: { "Content-Type": "application/json" }
    		}).then(function (res) {
    			if (res.ok) {
    				getTransfer();
    				updateAlert$1();
    			} else if (res.status == 404) {
    				errorAlert$3("Se ha intentado borrar un elemento inexistente.");
    			} else {
    				errorAlert$3("");
    			}
    		});
    	}

    	const writable_props = ["params"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1$5.warn(`<EditTransfer> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("EditTransfer", $$slots, []);

    	function input0_input_handler() {
    		updatedCountry = this.value;
    		$$invalidate(1, updatedCountry);
    	}

    	function input1_input_handler() {
    		updatedSigning = to_number(this.value);
    		$$invalidate(4, updatedSigning);
    	}

    	function input2_input_handler() {
    		updatedSale = to_number(this.value);
    		$$invalidate(5, updatedSale);
    	}

    	function input3_input_handler() {
    		updatedBalance = to_number(this.value);
    		$$invalidate(6, updatedBalance);
    	}

    	$$self.$set = $$props => {
    		if ("params" in $$props) $$invalidate(0, params = $$props.params);
    	};

    	$$self.$capture_state = () => ({
    		onMount,
    		pop,
    		Table,
    		Button,
    		Input,
    		params,
    		BASE_API_URL,
    		transfer,
    		updatedCountry,
    		updatedYear,
    		updatedTeam,
    		updatedSigning,
    		updatedSale,
    		updatedBalance,
    		errorMsg,
    		getTransfer,
    		updateTransfer,
    		errorAlert: errorAlert$3,
    		updateAlert: updateAlert$1,
    		clearAlert: clearAlert$3
    	});

    	$$self.$inject_state = $$props => {
    		if ("params" in $$props) $$invalidate(0, params = $$props.params);
    		if ("BASE_API_URL" in $$props) BASE_API_URL = $$props.BASE_API_URL;
    		if ("transfer" in $$props) $$invalidate(8, transfer = $$props.transfer);
    		if ("updatedCountry" in $$props) $$invalidate(1, updatedCountry = $$props.updatedCountry);
    		if ("updatedYear" in $$props) $$invalidate(2, updatedYear = $$props.updatedYear);
    		if ("updatedTeam" in $$props) $$invalidate(3, updatedTeam = $$props.updatedTeam);
    		if ("updatedSigning" in $$props) $$invalidate(4, updatedSigning = $$props.updatedSigning);
    		if ("updatedSale" in $$props) $$invalidate(5, updatedSale = $$props.updatedSale);
    		if ("updatedBalance" in $$props) $$invalidate(6, updatedBalance = $$props.updatedBalance);
    		if ("errorMsg" in $$props) $$invalidate(7, errorMsg = $$props.errorMsg);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		params,
    		updatedCountry,
    		updatedYear,
    		updatedTeam,
    		updatedSigning,
    		updatedSale,
    		updatedBalance,
    		errorMsg,
    		transfer,
    		updateTransfer,
    		BASE_API_URL,
    		getTransfer,
    		input0_input_handler,
    		input1_input_handler,
    		input2_input_handler,
    		input3_input_handler
    	];
    }

    class EditTransfer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$f, create_fragment$f, safe_not_equal, { params: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "EditTransfer",
    			options,
    			id: create_fragment$f.name
    		});
    	}

    	get params() {
    		throw new Error("<EditTransfer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set params(value) {
    		throw new Error("<EditTransfer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\front\GoalscorersGUI\GoalscorersTable.svelte generated by Svelte v3.21.0 */

    const { console: console_1$6 } = globals;
    const file$f = "src\\front\\GoalscorersGUI\\GoalscorersTable.svelte";

    function get_each_context$2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[32] = list[i];
    	return child_ctx;
    }

    function get_each_context_1$2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[35] = list[i];
    	return child_ctx;
    }

    function get_each_context_2$2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[38] = list[i];
    	return child_ctx;
    }

    // (1:0) <script>   import {    onMount   }
    function create_catch_block$4(ctx) {
    	const block = {
    		c: noop,
    		m: noop,
    		p: noop,
    		i: noop,
    		o: noop,
    		d: noop
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_catch_block$4.name,
    		type: "catch",
    		source: "(1:0) <script>   import {    onMount   }",
    		ctx
    	});

    	return block;
    }

    // (282:1) {:then goalscorers}
    function create_then_block$4(ctx) {
    	let t0;
    	let t1;
    	let t2;
    	let t3;
    	let current;

    	const formgroup0 = new FormGroup({
    			props: {
    				$$slots: { default: [create_default_slot_20$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const formgroup1 = new FormGroup({
    			props: {
    				$$slots: { default: [create_default_slot_17$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const button0 = new Button({
    			props: {
    				outline: true,
    				color: "secondary",
    				class: "button-search",
    				$$slots: { default: [create_default_slot_16$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button0.$on("click", function () {
    		if (is_function(/*search*/ ctx[12](/*currentYear*/ ctx[1], /*currentTeam*/ ctx[2]))) /*search*/ ctx[12](/*currentYear*/ ctx[1], /*currentTeam*/ ctx[2]).apply(this, arguments);
    	});

    	const button1 = new Button({
    			props: {
    				outline: true,
    				color: "primary",
    				$$slots: { default: [create_default_slot_15$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button1.$on("click", /*ReloadTable*/ ctx[8]);

    	const table = new Table({
    			props: {
    				bordered: true,
    				$$slots: { default: [create_default_slot_11$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(formgroup0.$$.fragment);
    			t0 = space();
    			create_component(formgroup1.$$.fragment);
    			t1 = space();
    			create_component(button0.$$.fragment);
    			t2 = space();
    			create_component(button1.$$.fragment);
    			t3 = space();
    			create_component(table.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(formgroup0, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(formgroup1, target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(button0, target, anchor);
    			insert_dev(target, t2, anchor);
    			mount_component(button1, target, anchor);
    			insert_dev(target, t3, anchor);
    			mount_component(table, target, anchor);
    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			const formgroup0_changes = {};

    			if (dirty[0] & /*currentYear*/ 2 | dirty[1] & /*$$scope*/ 1024) {
    				formgroup0_changes.$$scope = { dirty, ctx };
    			}

    			formgroup0.$set(formgroup0_changes);
    			const formgroup1_changes = {};

    			if (dirty[0] & /*currentTeam*/ 4 | dirty[1] & /*$$scope*/ 1024) {
    				formgroup1_changes.$$scope = { dirty, ctx };
    			}

    			formgroup1.$set(formgroup1_changes);
    			const button0_changes = {};

    			if (dirty[1] & /*$$scope*/ 1024) {
    				button0_changes.$$scope = { dirty, ctx };
    			}

    			button0.$set(button0_changes);
    			const button1_changes = {};

    			if (dirty[1] & /*$$scope*/ 1024) {
    				button1_changes.$$scope = { dirty, ctx };
    			}

    			button1.$set(button1_changes);
    			const table_changes = {};

    			if (dirty[0] & /*goalscorers, newGoalscorer*/ 33 | dirty[1] & /*$$scope*/ 1024) {
    				table_changes.$$scope = { dirty, ctx };
    			}

    			table.$set(table_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(formgroup0.$$.fragment, local);
    			transition_in(formgroup1.$$.fragment, local);
    			transition_in(button0.$$.fragment, local);
    			transition_in(button1.$$.fragment, local);
    			transition_in(table.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(formgroup0.$$.fragment, local);
    			transition_out(formgroup1.$$.fragment, local);
    			transition_out(button0.$$.fragment, local);
    			transition_out(button1.$$.fragment, local);
    			transition_out(table.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(formgroup0, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(formgroup1, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(button0, detaching);
    			if (detaching) detach_dev(t2);
    			destroy_component(button1, detaching);
    			if (detaching) detach_dev(t3);
    			destroy_component(table, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_then_block$4.name,
    		type: "then",
    		source: "(282:1) {:then goalscorers}",
    		ctx
    	});

    	return block;
    }

    // (285:3) <Label for="selectYear">
    function create_default_slot_22$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Año");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_22$1.name,
    		type: "slot",
    		source: "(285:3) <Label for=\\\"selectYear\\\">",
    		ctx
    	});

    	return block;
    }

    // (287:4) {#each debutYears as debut}
    function create_each_block_2$2(ctx) {
    	let option;
    	let t_value = /*debut*/ ctx[38] + "";
    	let t;
    	let option_value_value;

    	const block = {
    		c: function create() {
    			option = element("option");
    			t = text(t_value);
    			option.__value = option_value_value = /*debut*/ ctx[38];
    			option.value = option.__value;
    			add_location(option, file$f, 287, 4, 7768);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, option, anchor);
    			append_dev(option, t);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(option);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_2$2.name,
    		type: "each",
    		source: "(287:4) {#each debutYears as debut}",
    		ctx
    	});

    	return block;
    }

    // (286:3) <Input type="select"  name="selectYear" id="selectYear" bind:value="{currentYear}">
    function create_default_slot_21$2(ctx) {
    	let t0;
    	let option;
    	let each_value_2 = /*debutYears*/ ctx[6];
    	validate_each_argument(each_value_2);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_2.length; i += 1) {
    		each_blocks[i] = create_each_block_2$2(get_each_context_2$2(ctx, each_value_2, i));
    	}

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t0 = space();
    			option = element("option");
    			option.textContent = "-";
    			option.__value = "-";
    			option.value = option.__value;
    			add_location(option, file$f, 289, 4, 7811);
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, t0, anchor);
    			insert_dev(target, option, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*debutYears*/ 64) {
    				each_value_2 = /*debutYears*/ ctx[6];
    				validate_each_argument(each_value_2);
    				let i;

    				for (i = 0; i < each_value_2.length; i += 1) {
    					const child_ctx = get_each_context_2$2(ctx, each_value_2, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_2$2(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(t0.parentNode, t0);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value_2.length;
    			}
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(option);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_21$2.name,
    		type: "slot",
    		source: "(286:3) <Input type=\\\"select\\\"  name=\\\"selectYear\\\" id=\\\"selectYear\\\" bind:value=\\\"{currentYear}\\\">",
    		ctx
    	});

    	return block;
    }

    // (284:2) <FormGroup>
    function create_default_slot_20$2(ctx) {
    	let t;
    	let updating_value;
    	let current;

    	const label = new Label({
    			props: {
    				for: "selectYear",
    				$$slots: { default: [create_default_slot_22$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	function input_value_binding(value) {
    		/*input_value_binding*/ ctx[20].call(null, value);
    	}

    	let input_props = {
    		type: "select",
    		name: "selectYear",
    		id: "selectYear",
    		$$slots: { default: [create_default_slot_21$2] },
    		$$scope: { ctx }
    	};

    	if (/*currentYear*/ ctx[1] !== void 0) {
    		input_props.value = /*currentYear*/ ctx[1];
    	}

    	const input = new Input({ props: input_props, $$inline: true });
    	binding_callbacks.push(() => bind(input, "value", input_value_binding));

    	const block = {
    		c: function create() {
    			create_component(label.$$.fragment);
    			t = space();
    			create_component(input.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(label, target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(input, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const label_changes = {};

    			if (dirty[1] & /*$$scope*/ 1024) {
    				label_changes.$$scope = { dirty, ctx };
    			}

    			label.$set(label_changes);
    			const input_changes = {};

    			if (dirty[1] & /*$$scope*/ 1024) {
    				input_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_value && dirty[0] & /*currentYear*/ 2) {
    				updating_value = true;
    				input_changes.value = /*currentYear*/ ctx[1];
    				add_flush_callback(() => updating_value = false);
    			}

    			input.$set(input_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(label.$$.fragment, local);
    			transition_in(input.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(label.$$.fragment, local);
    			transition_out(input.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(label, detaching);
    			if (detaching) detach_dev(t);
    			destroy_component(input, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_20$2.name,
    		type: "slot",
    		source: "(284:2) <FormGroup>",
    		ctx
    	});

    	return block;
    }

    // (295:3) <Label for="selectTeam">
    function create_default_slot_19$2(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Búsqueda por equipo");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_19$2.name,
    		type: "slot",
    		source: "(295:3) <Label for=\\\"selectTeam\\\">",
    		ctx
    	});

    	return block;
    }

    // (297:4) {#each teams as team}
    function create_each_block_1$2(ctx) {
    	let option;
    	let t_value = /*team*/ ctx[35] + "";
    	let t;
    	let option_value_value;

    	const block = {
    		c: function create() {
    			option = element("option");
    			t = text(t_value);
    			option.__value = option_value_value = /*team*/ ctx[35];
    			option.value = option.__value;
    			add_location(option, file$f, 297, 4, 8054);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, option, anchor);
    			append_dev(option, t);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(option);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1$2.name,
    		type: "each",
    		source: "(297:4) {#each teams as team}",
    		ctx
    	});

    	return block;
    }

    // (296:3) <Input type="select" name="selectTeam" id="selectTeam" bind:value="{currentTeam}">
    function create_default_slot_18$2(ctx) {
    	let t0;
    	let option;
    	let each_value_1 = /*teams*/ ctx[7];
    	validate_each_argument(each_value_1);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1$2(get_each_context_1$2(ctx, each_value_1, i));
    	}

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t0 = space();
    			option = element("option");
    			option.textContent = "-";
    			option.__value = "-";
    			option.value = option.__value;
    			add_location(option, file$f, 299, 4, 8096);
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, t0, anchor);
    			insert_dev(target, option, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*teams*/ 128) {
    				each_value_1 = /*teams*/ ctx[7];
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1$2(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_1$2(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(t0.parentNode, t0);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value_1.length;
    			}
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(option);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_18$2.name,
    		type: "slot",
    		source: "(296:3) <Input type=\\\"select\\\" name=\\\"selectTeam\\\" id=\\\"selectTeam\\\" bind:value=\\\"{currentTeam}\\\">",
    		ctx
    	});

    	return block;
    }

    // (294:2) <FormGroup>
    function create_default_slot_17$2(ctx) {
    	let t;
    	let updating_value;
    	let current;

    	const label = new Label({
    			props: {
    				for: "selectTeam",
    				$$slots: { default: [create_default_slot_19$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	function input_value_binding_1(value) {
    		/*input_value_binding_1*/ ctx[21].call(null, value);
    	}

    	let input_props = {
    		type: "select",
    		name: "selectTeam",
    		id: "selectTeam",
    		$$slots: { default: [create_default_slot_18$2] },
    		$$scope: { ctx }
    	};

    	if (/*currentTeam*/ ctx[2] !== void 0) {
    		input_props.value = /*currentTeam*/ ctx[2];
    	}

    	const input = new Input({ props: input_props, $$inline: true });
    	binding_callbacks.push(() => bind(input, "value", input_value_binding_1));

    	const block = {
    		c: function create() {
    			create_component(label.$$.fragment);
    			t = space();
    			create_component(input.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(label, target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(input, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const label_changes = {};

    			if (dirty[1] & /*$$scope*/ 1024) {
    				label_changes.$$scope = { dirty, ctx };
    			}

    			label.$set(label_changes);
    			const input_changes = {};

    			if (dirty[1] & /*$$scope*/ 1024) {
    				input_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_value && dirty[0] & /*currentTeam*/ 4) {
    				updating_value = true;
    				input_changes.value = /*currentTeam*/ ctx[2];
    				add_flush_callback(() => updating_value = false);
    			}

    			input.$set(input_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(label.$$.fragment, local);
    			transition_in(input.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(label.$$.fragment, local);
    			transition_out(input.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(label, detaching);
    			if (detaching) detach_dev(t);
    			destroy_component(input, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_17$2.name,
    		type: "slot",
    		source: "(294:2) <FormGroup>",
    		ctx
    	});

    	return block;
    }

    // (304:2) <Button outline color="secondary" on:click="{search(currentYear, currentTeam)}" class="button-search" >
    function create_default_slot_16$2(ctx) {
    	let i;
    	let t;

    	const block = {
    		c: function create() {
    			i = element("i");
    			t = text(" Buscar");
    			attr_dev(i, "class", "fas fa-search");
    			add_location(i, file$f, 303, 106, 8253);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, i, anchor);
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(i);
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_16$2.name,
    		type: "slot",
    		source: "(304:2) <Button outline color=\\\"secondary\\\" on:click=\\\"{search(currentYear, currentTeam)}\\\" class=\\\"button-search\\\" >",
    		ctx
    	});

    	return block;
    }

    // (305:2) <Button outline color="primary" on:click="{ReloadTable}">
    function create_default_slot_15$2(ctx) {
    	let i;
    	let t;

    	const block = {
    		c: function create() {
    			i = element("i");
    			t = text(" Restaurar API");
    			attr_dev(i, "class", "fas fa-search");
    			add_location(i, file$f, 304, 60, 8361);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, i, anchor);
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(i);
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_15$2.name,
    		type: "slot",
    		source: "(305:2) <Button outline color=\\\"primary\\\" on:click=\\\"{ReloadTable}\\\">",
    		ctx
    	});

    	return block;
    }

    // (328:10) <Button outline  color="primary" on:click={insertGoalscorer}>
    function create_default_slot_14$2(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Insertar");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_14$2.name,
    		type: "slot",
    		source: "(328:10) <Button outline  color=\\\"primary\\\" on:click={insertGoalscorer}>",
    		ctx
    	});

    	return block;
    }

    // (338:10) <Button outline color="danger" on:click="{deleteGoalscorer(goalscorer.name)}" >
    function create_default_slot_13$2(ctx) {
    	let i;
    	let t;

    	const block = {
    		c: function create() {
    			i = element("i");
    			t = text(" Eliminar");
    			attr_dev(i, "class", "fa fa-trash");
    			attr_dev(i, "aria-hidden", "true");
    			add_location(i, file$f, 337, 90, 9530);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, i, anchor);
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(i);
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_13$2.name,
    		type: "slot",
    		source: "(338:10) <Button outline color=\\\"danger\\\" on:click=\\\"{deleteGoalscorer(goalscorer.name)}\\\" >",
    		ctx
    	});

    	return block;
    }

    // (339:10) <Button outline color="info" href="#/goalscorers/{goalscorer.name}">
    function create_default_slot_12$2(ctx) {
    	let i;
    	let t;

    	const block = {
    		c: function create() {
    			i = element("i");
    			t = text(" Editar");
    			attr_dev(i, "class", "fa fa-edit");
    			attr_dev(i, "aria-hidden", "true");
    			add_location(i, file$f, 338, 79, 9680);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, i, anchor);
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(i);
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_12$2.name,
    		type: "slot",
    		source: "(339:10) <Button outline color=\\\"info\\\" href=\\\"#/goalscorers/{goalscorer.name}\\\">",
    		ctx
    	});

    	return block;
    }

    // (330:4) {#each goalscorers as goalscorer}
    function create_each_block$2(ctx) {
    	let tr;
    	let td0;
    	let t0_value = /*goalscorer*/ ctx[32].name + "";
    	let t0;
    	let t1;
    	let td1;
    	let t2_value = /*goalscorer*/ ctx[32].country + "";
    	let t2;
    	let t3;
    	let td2;
    	let t4_value = /*goalscorer*/ ctx[32].debut + "";
    	let t4;
    	let t5;
    	let td3;
    	let t6_value = /*goalscorer*/ ctx[32].goals + "";
    	let t6;
    	let t7;
    	let td4;
    	let t8_value = /*goalscorer*/ ctx[32].matches + "";
    	let t8;
    	let t9;
    	let td5;
    	let t10_value = /*goalscorer*/ ctx[32].teams + "";
    	let t10;
    	let t11;
    	let td6;
    	let t12;
    	let td7;
    	let t13;
    	let current;

    	const button0 = new Button({
    			props: {
    				outline: true,
    				color: "danger",
    				$$slots: { default: [create_default_slot_13$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button0.$on("click", function () {
    		if (is_function(/*deleteGoalscorer*/ ctx[10](/*goalscorer*/ ctx[32].name))) /*deleteGoalscorer*/ ctx[10](/*goalscorer*/ ctx[32].name).apply(this, arguments);
    	});

    	const button1 = new Button({
    			props: {
    				outline: true,
    				color: "info",
    				href: "#/goalscorers/" + /*goalscorer*/ ctx[32].name,
    				$$slots: { default: [create_default_slot_12$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			tr = element("tr");
    			td0 = element("td");
    			t0 = text(t0_value);
    			t1 = space();
    			td1 = element("td");
    			t2 = text(t2_value);
    			t3 = space();
    			td2 = element("td");
    			t4 = text(t4_value);
    			t5 = space();
    			td3 = element("td");
    			t6 = text(t6_value);
    			t7 = space();
    			td4 = element("td");
    			t8 = text(t8_value);
    			t9 = space();
    			td5 = element("td");
    			t10 = text(t10_value);
    			t11 = space();
    			td6 = element("td");
    			create_component(button0.$$.fragment);
    			t12 = space();
    			td7 = element("td");
    			create_component(button1.$$.fragment);
    			t13 = space();
    			add_location(td0, file$f, 331, 6, 9233);
    			add_location(td1, file$f, 332, 6, 9267);
    			add_location(td2, file$f, 333, 6, 9304);
    			add_location(td3, file$f, 334, 6, 9339);
    			add_location(td4, file$f, 335, 6, 9374);
    			add_location(td5, file$f, 336, 6, 9411);
    			add_location(td6, file$f, 337, 6, 9446);
    			add_location(td7, file$f, 338, 6, 9607);
    			add_location(tr, file$f, 330, 5, 9221);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, tr, anchor);
    			append_dev(tr, td0);
    			append_dev(td0, t0);
    			append_dev(tr, t1);
    			append_dev(tr, td1);
    			append_dev(td1, t2);
    			append_dev(tr, t3);
    			append_dev(tr, td2);
    			append_dev(td2, t4);
    			append_dev(tr, t5);
    			append_dev(tr, td3);
    			append_dev(td3, t6);
    			append_dev(tr, t7);
    			append_dev(tr, td4);
    			append_dev(td4, t8);
    			append_dev(tr, t9);
    			append_dev(tr, td5);
    			append_dev(td5, t10);
    			append_dev(tr, t11);
    			append_dev(tr, td6);
    			mount_component(button0, td6, null);
    			append_dev(tr, t12);
    			append_dev(tr, td7);
    			mount_component(button1, td7, null);
    			append_dev(tr, t13);
    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			if ((!current || dirty[0] & /*goalscorers*/ 32) && t0_value !== (t0_value = /*goalscorer*/ ctx[32].name + "")) set_data_dev(t0, t0_value);
    			if ((!current || dirty[0] & /*goalscorers*/ 32) && t2_value !== (t2_value = /*goalscorer*/ ctx[32].country + "")) set_data_dev(t2, t2_value);
    			if ((!current || dirty[0] & /*goalscorers*/ 32) && t4_value !== (t4_value = /*goalscorer*/ ctx[32].debut + "")) set_data_dev(t4, t4_value);
    			if ((!current || dirty[0] & /*goalscorers*/ 32) && t6_value !== (t6_value = /*goalscorer*/ ctx[32].goals + "")) set_data_dev(t6, t6_value);
    			if ((!current || dirty[0] & /*goalscorers*/ 32) && t8_value !== (t8_value = /*goalscorer*/ ctx[32].matches + "")) set_data_dev(t8, t8_value);
    			if ((!current || dirty[0] & /*goalscorers*/ 32) && t10_value !== (t10_value = /*goalscorer*/ ctx[32].teams + "")) set_data_dev(t10, t10_value);
    			const button0_changes = {};

    			if (dirty[1] & /*$$scope*/ 1024) {
    				button0_changes.$$scope = { dirty, ctx };
    			}

    			button0.$set(button0_changes);
    			const button1_changes = {};
    			if (dirty[0] & /*goalscorers*/ 32) button1_changes.href = "#/goalscorers/" + /*goalscorer*/ ctx[32].name;

    			if (dirty[1] & /*$$scope*/ 1024) {
    				button1_changes.$$scope = { dirty, ctx };
    			}

    			button1.$set(button1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(button0.$$.fragment, local);
    			transition_in(button1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(button0.$$.fragment, local);
    			transition_out(button1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(tr);
    			destroy_component(button0);
    			destroy_component(button1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$2.name,
    		type: "each",
    		source: "(330:4) {#each goalscorers as goalscorer}",
    		ctx
    	});

    	return block;
    }

    // (307:2) <Table bordered>
    function create_default_slot_11$2(ctx) {
    	let thead;
    	let tr0;
    	let th0;
    	let t1;
    	let th1;
    	let t3;
    	let th2;
    	let t5;
    	let th3;
    	let t7;
    	let th4;
    	let t9;
    	let th5;
    	let t11;
    	let th6;
    	let t13;
    	let tbody;
    	let tr1;
    	let td0;
    	let input0;
    	let t14;
    	let td1;
    	let input1;
    	let t15;
    	let td2;
    	let input2;
    	let t16;
    	let td3;
    	let input3;
    	let t17;
    	let td4;
    	let input4;
    	let t18;
    	let td5;
    	let input5;
    	let t19;
    	let td6;
    	let t20;
    	let current;
    	let dispose;

    	const button = new Button({
    			props: {
    				outline: true,
    				color: "primary",
    				$$slots: { default: [create_default_slot_14$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button.$on("click", /*insertGoalscorer*/ ctx[9]);
    	let each_value = /*goalscorers*/ ctx[5];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			thead = element("thead");
    			tr0 = element("tr");
    			th0 = element("th");
    			th0.textContent = "Nombre";
    			t1 = space();
    			th1 = element("th");
    			th1.textContent = "País";
    			t3 = space();
    			th2 = element("th");
    			th2.textContent = "Debut";
    			t5 = space();
    			th3 = element("th");
    			th3.textContent = "Goles";
    			t7 = space();
    			th4 = element("th");
    			th4.textContent = "Partidos";
    			t9 = space();
    			th5 = element("th");
    			th5.textContent = "Equipos";
    			t11 = space();
    			th6 = element("th");
    			th6.textContent = "Acciones";
    			t13 = space();
    			tbody = element("tbody");
    			tr1 = element("tr");
    			td0 = element("td");
    			input0 = element("input");
    			t14 = space();
    			td1 = element("td");
    			input1 = element("input");
    			t15 = space();
    			td2 = element("td");
    			input2 = element("input");
    			t16 = space();
    			td3 = element("td");
    			input3 = element("input");
    			t17 = space();
    			td4 = element("td");
    			input4 = element("input");
    			t18 = space();
    			td5 = element("td");
    			input5 = element("input");
    			t19 = space();
    			td6 = element("td");
    			create_component(button.$$.fragment);
    			t20 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			add_location(th0, file$f, 309, 5, 8465);
    			add_location(th1, file$f, 310, 5, 8487);
    			add_location(th2, file$f, 311, 5, 8507);
    			add_location(th3, file$f, 312, 5, 8528);
    			add_location(th4, file$f, 313, 5, 8549);
    			add_location(th5, file$f, 314, 5, 8573);
    			add_location(th6, file$f, 315, 5, 8596);
    			add_location(tr0, file$f, 308, 4, 8454);
    			add_location(thead, file$f, 307, 3, 8441);
    			add_location(input0, file$f, 321, 9, 8672);
    			add_location(td0, file$f, 321, 5, 8668);
    			add_location(input1, file$f, 322, 9, 8729);
    			add_location(td1, file$f, 322, 5, 8725);
    			attr_dev(input2, "type", "number");
    			add_location(input2, file$f, 323, 9, 8789);
    			add_location(td2, file$f, 323, 5, 8785);
    			attr_dev(input3, "type", "number");
    			add_location(input3, file$f, 324, 9, 8861);
    			add_location(td3, file$f, 324, 5, 8857);
    			attr_dev(input4, "type", "number");
    			add_location(input4, file$f, 325, 9, 8933);
    			add_location(td4, file$f, 325, 5, 8929);
    			attr_dev(input5, "type", "number");
    			add_location(input5, file$f, 326, 9, 9007);
    			add_location(td5, file$f, 326, 5, 9003);
    			add_location(td6, file$f, 327, 5, 9075);
    			add_location(tr1, file$f, 320, 4, 8657);
    			add_location(tbody, file$f, 319, 3, 8644);
    		},
    		m: function mount(target, anchor, remount) {
    			insert_dev(target, thead, anchor);
    			append_dev(thead, tr0);
    			append_dev(tr0, th0);
    			append_dev(tr0, t1);
    			append_dev(tr0, th1);
    			append_dev(tr0, t3);
    			append_dev(tr0, th2);
    			append_dev(tr0, t5);
    			append_dev(tr0, th3);
    			append_dev(tr0, t7);
    			append_dev(tr0, th4);
    			append_dev(tr0, t9);
    			append_dev(tr0, th5);
    			append_dev(tr0, t11);
    			append_dev(tr0, th6);
    			insert_dev(target, t13, anchor);
    			insert_dev(target, tbody, anchor);
    			append_dev(tbody, tr1);
    			append_dev(tr1, td0);
    			append_dev(td0, input0);
    			set_input_value(input0, /*newGoalscorer*/ ctx[0].name);
    			append_dev(tr1, t14);
    			append_dev(tr1, td1);
    			append_dev(td1, input1);
    			set_input_value(input1, /*newGoalscorer*/ ctx[0].country);
    			append_dev(tr1, t15);
    			append_dev(tr1, td2);
    			append_dev(td2, input2);
    			set_input_value(input2, /*newGoalscorer*/ ctx[0].debut);
    			append_dev(tr1, t16);
    			append_dev(tr1, td3);
    			append_dev(td3, input3);
    			set_input_value(input3, /*newGoalscorer*/ ctx[0].goals);
    			append_dev(tr1, t17);
    			append_dev(tr1, td4);
    			append_dev(td4, input4);
    			set_input_value(input4, /*newGoalscorer*/ ctx[0].matches);
    			append_dev(tr1, t18);
    			append_dev(tr1, td5);
    			append_dev(td5, input5);
    			set_input_value(input5, /*newGoalscorer*/ ctx[0].teams);
    			append_dev(tr1, t19);
    			append_dev(tr1, td6);
    			mount_component(button, td6, null);
    			append_dev(tbody, t20);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(tbody, null);
    			}

    			current = true;
    			if (remount) run_all(dispose);

    			dispose = [
    				listen_dev(input0, "input", /*input0_input_handler*/ ctx[22]),
    				listen_dev(input1, "input", /*input1_input_handler*/ ctx[23]),
    				listen_dev(input2, "input", /*input2_input_handler*/ ctx[24]),
    				listen_dev(input3, "input", /*input3_input_handler*/ ctx[25]),
    				listen_dev(input4, "input", /*input4_input_handler*/ ctx[26]),
    				listen_dev(input5, "input", /*input5_input_handler*/ ctx[27])
    			];
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*newGoalscorer*/ 1 && input0.value !== /*newGoalscorer*/ ctx[0].name) {
    				set_input_value(input0, /*newGoalscorer*/ ctx[0].name);
    			}

    			if (dirty[0] & /*newGoalscorer*/ 1 && input1.value !== /*newGoalscorer*/ ctx[0].country) {
    				set_input_value(input1, /*newGoalscorer*/ ctx[0].country);
    			}

    			if (dirty[0] & /*newGoalscorer*/ 1 && to_number(input2.value) !== /*newGoalscorer*/ ctx[0].debut) {
    				set_input_value(input2, /*newGoalscorer*/ ctx[0].debut);
    			}

    			if (dirty[0] & /*newGoalscorer*/ 1 && to_number(input3.value) !== /*newGoalscorer*/ ctx[0].goals) {
    				set_input_value(input3, /*newGoalscorer*/ ctx[0].goals);
    			}

    			if (dirty[0] & /*newGoalscorer*/ 1 && to_number(input4.value) !== /*newGoalscorer*/ ctx[0].matches) {
    				set_input_value(input4, /*newGoalscorer*/ ctx[0].matches);
    			}

    			if (dirty[0] & /*newGoalscorer*/ 1 && to_number(input5.value) !== /*newGoalscorer*/ ctx[0].teams) {
    				set_input_value(input5, /*newGoalscorer*/ ctx[0].teams);
    			}

    			const button_changes = {};

    			if (dirty[1] & /*$$scope*/ 1024) {
    				button_changes.$$scope = { dirty, ctx };
    			}

    			button.$set(button_changes);

    			if (dirty[0] & /*goalscorers, deleteGoalscorer*/ 1056) {
    				each_value = /*goalscorers*/ ctx[5];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$2(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$2(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(tbody, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(button.$$.fragment, local);

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(button.$$.fragment, local);
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(thead);
    			if (detaching) detach_dev(t13);
    			if (detaching) detach_dev(tbody);
    			destroy_component(button);
    			destroy_each(each_blocks, detaching);
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_11$2.name,
    		type: "slot",
    		source: "(307:2) <Table bordered>",
    		ctx
    	});

    	return block;
    }

    // (280:21)     Loading goalscorers...   {:then goalscorers}
    function create_pending_block$4(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Loading goalscorers...");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_pending_block$4.name,
    		type: "pending",
    		source: "(280:21)     Loading goalscorers...   {:then goalscorers}",
    		ctx
    	});

    	return block;
    }

    // (349:2) <PaginationItem class="{currentPage === 1 ? 'disabled' : ''}">
    function create_default_slot_10$2(ctx) {
    	let current;

    	const paginationlink = new PaginationLink({
    			props: { previous: true, href: "#/goalscorersAPI" },
    			$$inline: true
    		});

    	paginationlink.$on("click", /*click_handler*/ ctx[28]);

    	const block = {
    		c: function create() {
    			create_component(paginationlink.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(paginationlink, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(paginationlink.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(paginationlink.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(paginationlink, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_10$2.name,
    		type: "slot",
    		source: "(349:2) <PaginationItem class=\\\"{currentPage === 1 ? 'disabled' : ''}\\\">",
    		ctx
    	});

    	return block;
    }

    // (353:2) {#if currentPage != 1}
    function create_if_block_1$4(ctx) {
    	let current;

    	const paginationitem = new PaginationItem({
    			props: {
    				$$slots: { default: [create_default_slot_8$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(paginationitem.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(paginationitem, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const paginationitem_changes = {};

    			if (dirty[0] & /*currentPage*/ 8 | dirty[1] & /*$$scope*/ 1024) {
    				paginationitem_changes.$$scope = { dirty, ctx };
    			}

    			paginationitem.$set(paginationitem_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(paginationitem.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(paginationitem.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(paginationitem, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$4.name,
    		type: "if",
    		source: "(353:2) {#if currentPage != 1}",
    		ctx
    	});

    	return block;
    }

    // (355:3) <PaginationLink href="#/goalscorersAPI" on:click="{() => addOffset(-1)}" >
    function create_default_slot_9$2(ctx) {
    	let t_value = /*currentPage*/ ctx[3] - 1 + "";
    	let t;

    	const block = {
    		c: function create() {
    			t = text(t_value);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*currentPage*/ 8 && t_value !== (t_value = /*currentPage*/ ctx[3] - 1 + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_9$2.name,
    		type: "slot",
    		source: "(355:3) <PaginationLink href=\\\"#/goalscorersAPI\\\" on:click=\\\"{() => addOffset(-1)}\\\" >",
    		ctx
    	});

    	return block;
    }

    // (354:2) <PaginationItem>
    function create_default_slot_8$2(ctx) {
    	let current;

    	const paginationlink = new PaginationLink({
    			props: {
    				href: "#/goalscorersAPI",
    				$$slots: { default: [create_default_slot_9$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	paginationlink.$on("click", /*click_handler_1*/ ctx[29]);

    	const block = {
    		c: function create() {
    			create_component(paginationlink.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(paginationlink, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const paginationlink_changes = {};

    			if (dirty[0] & /*currentPage*/ 8 | dirty[1] & /*$$scope*/ 1024) {
    				paginationlink_changes.$$scope = { dirty, ctx };
    			}

    			paginationlink.$set(paginationlink_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(paginationlink.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(paginationlink.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(paginationlink, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_8$2.name,
    		type: "slot",
    		source: "(354:2) <PaginationItem>",
    		ctx
    	});

    	return block;
    }

    // (359:3) <PaginationLink href="#/goalscorersAPI" >
    function create_default_slot_7$2(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text(/*currentPage*/ ctx[3]);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*currentPage*/ 8) set_data_dev(t, /*currentPage*/ ctx[3]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_7$2.name,
    		type: "slot",
    		source: "(359:3) <PaginationLink href=\\\"#/goalscorersAPI\\\" >",
    		ctx
    	});

    	return block;
    }

    // (358:2) <PaginationItem active>
    function create_default_slot_6$2(ctx) {
    	let current;

    	const paginationlink = new PaginationLink({
    			props: {
    				href: "#/goalscorersAPI",
    				$$slots: { default: [create_default_slot_7$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(paginationlink.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(paginationlink, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const paginationlink_changes = {};

    			if (dirty[0] & /*currentPage*/ 8 | dirty[1] & /*$$scope*/ 1024) {
    				paginationlink_changes.$$scope = { dirty, ctx };
    			}

    			paginationlink.$set(paginationlink_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(paginationlink.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(paginationlink.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(paginationlink, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_6$2.name,
    		type: "slot",
    		source: "(358:2) <PaginationItem active>",
    		ctx
    	});

    	return block;
    }

    // (362:2) {#if moreData}
    function create_if_block$a(ctx) {
    	let current;

    	const paginationitem = new PaginationItem({
    			props: {
    				$$slots: { default: [create_default_slot_4$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(paginationitem.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(paginationitem, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const paginationitem_changes = {};

    			if (dirty[0] & /*currentPage*/ 8 | dirty[1] & /*$$scope*/ 1024) {
    				paginationitem_changes.$$scope = { dirty, ctx };
    			}

    			paginationitem.$set(paginationitem_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(paginationitem.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(paginationitem.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(paginationitem, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$a.name,
    		type: "if",
    		source: "(362:2) {#if moreData}",
    		ctx
    	});

    	return block;
    }

    // (364:3) <PaginationLink href="#/goalscorersAPI" on:click="{() => addOffset(1)}">
    function create_default_slot_5$2(ctx) {
    	let t_value = /*currentPage*/ ctx[3] + 1 + "";
    	let t;

    	const block = {
    		c: function create() {
    			t = text(t_value);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*currentPage*/ 8 && t_value !== (t_value = /*currentPage*/ ctx[3] + 1 + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_5$2.name,
    		type: "slot",
    		source: "(364:3) <PaginationLink href=\\\"#/goalscorersAPI\\\" on:click=\\\"{() => addOffset(1)}\\\">",
    		ctx
    	});

    	return block;
    }

    // (363:2) <PaginationItem >
    function create_default_slot_4$2(ctx) {
    	let current;

    	const paginationlink = new PaginationLink({
    			props: {
    				href: "#/goalscorersAPI",
    				$$slots: { default: [create_default_slot_5$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	paginationlink.$on("click", /*click_handler_2*/ ctx[30]);

    	const block = {
    		c: function create() {
    			create_component(paginationlink.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(paginationlink, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const paginationlink_changes = {};

    			if (dirty[0] & /*currentPage*/ 8 | dirty[1] & /*$$scope*/ 1024) {
    				paginationlink_changes.$$scope = { dirty, ctx };
    			}

    			paginationlink.$set(paginationlink_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(paginationlink.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(paginationlink.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(paginationlink, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_4$2.name,
    		type: "slot",
    		source: "(363:2) <PaginationItem >",
    		ctx
    	});

    	return block;
    }

    // (368:2) <PaginationItem class="{moreData ? '' : 'disabled'}">
    function create_default_slot_3$2(ctx) {
    	let current;

    	const paginationlink = new PaginationLink({
    			props: { next: true, href: "#/goalscorersAPI" },
    			$$inline: true
    		});

    	paginationlink.$on("click", /*click_handler_3*/ ctx[31]);

    	const block = {
    		c: function create() {
    			create_component(paginationlink.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(paginationlink, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(paginationlink.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(paginationlink.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(paginationlink, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3$2.name,
    		type: "slot",
    		source: "(368:2) <PaginationItem class=\\\"{moreData ? '' : 'disabled'}\\\">",
    		ctx
    	});

    	return block;
    }

    // (346:1) <Pagination style="float:right;" ariaLabel="Cambiar de página">
    function create_default_slot_2$4(ctx) {
    	let t0;
    	let t1;
    	let t2;
    	let t3;
    	let current;

    	const paginationitem0 = new PaginationItem({
    			props: {
    				class: /*currentPage*/ ctx[3] === 1 ? "disabled" : "",
    				$$slots: { default: [create_default_slot_10$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	let if_block0 = /*currentPage*/ ctx[3] != 1 && create_if_block_1$4(ctx);

    	const paginationitem1 = new PaginationItem({
    			props: {
    				active: true,
    				$$slots: { default: [create_default_slot_6$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	let if_block1 = /*moreData*/ ctx[4] && create_if_block$a(ctx);

    	const paginationitem2 = new PaginationItem({
    			props: {
    				class: /*moreData*/ ctx[4] ? "" : "disabled",
    				$$slots: { default: [create_default_slot_3$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(paginationitem0.$$.fragment);
    			t0 = space();
    			if (if_block0) if_block0.c();
    			t1 = space();
    			create_component(paginationitem1.$$.fragment);
    			t2 = space();
    			if (if_block1) if_block1.c();
    			t3 = space();
    			create_component(paginationitem2.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(paginationitem0, target, anchor);
    			insert_dev(target, t0, anchor);
    			if (if_block0) if_block0.m(target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(paginationitem1, target, anchor);
    			insert_dev(target, t2, anchor);
    			if (if_block1) if_block1.m(target, anchor);
    			insert_dev(target, t3, anchor);
    			mount_component(paginationitem2, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const paginationitem0_changes = {};
    			if (dirty[0] & /*currentPage*/ 8) paginationitem0_changes.class = /*currentPage*/ ctx[3] === 1 ? "disabled" : "";

    			if (dirty[1] & /*$$scope*/ 1024) {
    				paginationitem0_changes.$$scope = { dirty, ctx };
    			}

    			paginationitem0.$set(paginationitem0_changes);

    			if (/*currentPage*/ ctx[3] != 1) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);

    					if (dirty[0] & /*currentPage*/ 8) {
    						transition_in(if_block0, 1);
    					}
    				} else {
    					if_block0 = create_if_block_1$4(ctx);
    					if_block0.c();
    					transition_in(if_block0, 1);
    					if_block0.m(t1.parentNode, t1);
    				}
    			} else if (if_block0) {
    				group_outros();

    				transition_out(if_block0, 1, 1, () => {
    					if_block0 = null;
    				});

    				check_outros();
    			}

    			const paginationitem1_changes = {};

    			if (dirty[0] & /*currentPage*/ 8 | dirty[1] & /*$$scope*/ 1024) {
    				paginationitem1_changes.$$scope = { dirty, ctx };
    			}

    			paginationitem1.$set(paginationitem1_changes);

    			if (/*moreData*/ ctx[4]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);

    					if (dirty[0] & /*moreData*/ 16) {
    						transition_in(if_block1, 1);
    					}
    				} else {
    					if_block1 = create_if_block$a(ctx);
    					if_block1.c();
    					transition_in(if_block1, 1);
    					if_block1.m(t3.parentNode, t3);
    				}
    			} else if (if_block1) {
    				group_outros();

    				transition_out(if_block1, 1, 1, () => {
    					if_block1 = null;
    				});

    				check_outros();
    			}

    			const paginationitem2_changes = {};
    			if (dirty[0] & /*moreData*/ 16) paginationitem2_changes.class = /*moreData*/ ctx[4] ? "" : "disabled";

    			if (dirty[1] & /*$$scope*/ 1024) {
    				paginationitem2_changes.$$scope = { dirty, ctx };
    			}

    			paginationitem2.$set(paginationitem2_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(paginationitem0.$$.fragment, local);
    			transition_in(if_block0);
    			transition_in(paginationitem1.$$.fragment, local);
    			transition_in(if_block1);
    			transition_in(paginationitem2.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(paginationitem0.$$.fragment, local);
    			transition_out(if_block0);
    			transition_out(paginationitem1.$$.fragment, local);
    			transition_out(if_block1);
    			transition_out(paginationitem2.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(paginationitem0, detaching);
    			if (detaching) detach_dev(t0);
    			if (if_block0) if_block0.d(detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(paginationitem1, detaching);
    			if (detaching) detach_dev(t2);
    			if (if_block1) if_block1.d(detaching);
    			if (detaching) detach_dev(t3);
    			destroy_component(paginationitem2, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2$4.name,
    		type: "slot",
    		source: "(346:1) <Pagination style=\\\"float:right;\\\" ariaLabel=\\\"Cambiar de página\\\">",
    		ctx
    	});

    	return block;
    }

    // (374:1) <Button outline color="secondary" on:click="{pop}">
    function create_default_slot_1$4(ctx) {
    	let i;
    	let t;

    	const block = {
    		c: function create() {
    			i = element("i");
    			t = text(" Atrás");
    			attr_dev(i, "class", "fas fa-arrow-circle-left");
    			add_location(i, file$f, 373, 53, 10795);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, i, anchor);
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(i);
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$4.name,
    		type: "slot",
    		source: "(374:1) <Button outline color=\\\"secondary\\\" on:click=\\\"{pop}\\\">",
    		ctx
    	});

    	return block;
    }

    // (375:1) <Button outline on:click={deleteGoalscorers} color="danger">
    function create_default_slot$4(ctx) {
    	let i;
    	let t;

    	const block = {
    		c: function create() {
    			i = element("i");
    			t = text(" Borrar todo");
    			attr_dev(i, "class", "fa fa-trash");
    			attr_dev(i, "aria-hidden", "true");
    			add_location(i, file$f, 374, 62, 10915);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, i, anchor);
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(i);
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$4.name,
    		type: "slot",
    		source: "(375:1) <Button outline on:click={deleteGoalscorers} color=\\\"danger\\\">",
    		ctx
    	});

    	return block;
    }

    function create_fragment$g(ctx) {
    	let main;
    	let div;
    	let t0;
    	let promise;
    	let t1;
    	let t2;
    	let t3;
    	let current;

    	let info = {
    		ctx,
    		current: null,
    		token: null,
    		pending: create_pending_block$4,
    		then: create_then_block$4,
    		catch: create_catch_block$4,
    		value: 5,
    		blocks: [,,,]
    	};

    	handle_promise(promise = /*goalscorers*/ ctx[5], info);

    	const pagination = new Pagination({
    			props: {
    				style: "float:right;",
    				ariaLabel: "Cambiar de página",
    				$$slots: { default: [create_default_slot_2$4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const button0 = new Button({
    			props: {
    				outline: true,
    				color: "secondary",
    				$$slots: { default: [create_default_slot_1$4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button0.$on("click", pop);

    	const button1 = new Button({
    			props: {
    				outline: true,
    				color: "danger",
    				$$slots: { default: [create_default_slot$4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button1.$on("click", /*deleteGoalscorers*/ ctx[11]);

    	const block = {
    		c: function create() {
    			main = element("main");
    			div = element("div");
    			t0 = space();
    			info.block.c();
    			t1 = space();
    			create_component(pagination.$$.fragment);
    			t2 = space();
    			create_component(button0.$$.fragment);
    			t3 = space();
    			create_component(button1.$$.fragment);
    			attr_dev(div, "role", "alert");
    			attr_dev(div, "id", "div_alert");
    			set_style(div, "display", "none");
    			add_location(div, file$f, 278, 1, 7445);
    			add_location(main, file$f, 277, 0, 7436);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, div);
    			append_dev(main, t0);
    			info.block.m(main, info.anchor = null);
    			info.mount = () => main;
    			info.anchor = t1;
    			append_dev(main, t1);
    			mount_component(pagination, main, null);
    			append_dev(main, t2);
    			mount_component(button0, main, null);
    			append_dev(main, t3);
    			mount_component(button1, main, null);
    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			info.ctx = ctx;

    			if (dirty[0] & /*goalscorers*/ 32 && promise !== (promise = /*goalscorers*/ ctx[5]) && handle_promise(promise, info)) ; else {
    				const child_ctx = ctx.slice();
    				child_ctx[5] = info.resolved;
    				info.block.p(child_ctx, dirty);
    			}

    			const pagination_changes = {};

    			if (dirty[0] & /*moreData, currentPage*/ 24 | dirty[1] & /*$$scope*/ 1024) {
    				pagination_changes.$$scope = { dirty, ctx };
    			}

    			pagination.$set(pagination_changes);
    			const button0_changes = {};

    			if (dirty[1] & /*$$scope*/ 1024) {
    				button0_changes.$$scope = { dirty, ctx };
    			}

    			button0.$set(button0_changes);
    			const button1_changes = {};

    			if (dirty[1] & /*$$scope*/ 1024) {
    				button1_changes.$$scope = { dirty, ctx };
    			}

    			button1.$set(button1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(info.block);
    			transition_in(pagination.$$.fragment, local);
    			transition_in(button0.$$.fragment, local);
    			transition_in(button1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			for (let i = 0; i < 3; i += 1) {
    				const block = info.blocks[i];
    				transition_out(block);
    			}

    			transition_out(pagination.$$.fragment, local);
    			transition_out(button0.$$.fragment, local);
    			transition_out(button1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			info.block.d();
    			info.token = null;
    			info = null;
    			destroy_component(pagination);
    			destroy_component(button0);
    			destroy_component(button1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$g.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function insertAlert$2() {
    	clearAlert$4();
    	var alert_element = document.getElementById("div_alert");
    	alert_element.style = "position: fixed; top: 0px; top: 2%; width: 90%;";
    	alert_element.className = "alert alert-dismissible in alert-success ";
    	alert_element.innerHTML = "<strong> Dato insertado.</strong> Se ha insertado el dato correctamente";

    	setTimeout(
    		() => {
    			clearAlert$4();
    		},
    		3000
    	);
    }

    function deleteAlert$2() {
    	clearAlert$4();
    	var alert_element = document.getElementById("div_alert");
    	alert_element.style = "position: fixed; top: 0px; top: 2%; width: 90%;";
    	alert_element.className = "alert alert-dismissible in alert-danger ";
    	alert_element.innerHTML = "<strong> Dato borrado.</strong> Se ha borrado el dato correctamente";

    	setTimeout(
    		() => {
    			clearAlert$4();
    		},
    		3000
    	);
    }

    function deleteAllAlert$2() {
    	clearAlert$4();
    	var alert_element = document.getElementById("div_alert");
    	alert_element.style = "position: fixed; top: 0px; top: 2%; width: 90%;";
    	alert_element.className = "alert alert-dismissible in alert-danger ";
    	alert_element.innerHTML = "<strong> Datos borrados.</strong> Se han borrado todos los datos correctamente";

    	setTimeout(
    		() => {
    			clearAlert$4();
    		},
    		3000
    	);
    }

    function ReloadTableAlert$2() {
    	clearAlert$4();
    	var alert_element = document.getElementById("div_alert");
    	alert_element.style = "position: fixed; top: 0px; top: 2%; width: 90%;";
    	alert_element.className = "alert alert-dismissible in alert-info ";
    	alert_element.innerHTML = "<strong> Tabla Restaurada.</strong> Se han restaurado los datos";

    	setTimeout(
    		() => {
    			clearAlert$4();
    		},
    		3000
    	);
    }

    function errorAlert$4(error) {
    	clearAlert$4();
    	var alert_element = document.getElementById("div_alert");
    	alert_element.style = "position: fixed; top: 0px; top: 2%; width: 90%;";
    	alert_element.className = "alert alert-dismissible in alert-danger ";
    	alert_element.innerHTML = "<strong> Error.</strong> Ha ocurrido un error " + error;

    	setTimeout(
    		() => {
    			clearAlert$4();
    		},
    		3000
    	);
    }

    function clearAlert$4() {
    	var alert_element = document.getElementById("div_alert");
    	alert_element.style = "display: none; ";
    	alert_element.className = "alert alert-dismissible in";
    	alert_element.innerHTML = "";
    }

    function instance$g($$self, $$props, $$invalidate) {
    	let goalscorers = [];

    	let newGoalscorer = {
    		name: "",
    		country: "",
    		debut: parseInt(""),
    		goals: "",
    		matches: "",
    		teams: ""
    	};

    	let BASE_API_URL = "/api/v2";
    	let debutYears = [];
    	let teams = [];
    	let totalGoals = [];
    	let currentYear = "-";
    	let currentTeam = "-";
    	let numberElementsPages = 10;
    	let offset = 0;
    	let currentPage = 1;
    	let moreData = true;
    	onMount(getGoalscorers);

    	async function ReloadTable() {
    		const res = await fetch(BASE_API_URL + "/goalscorers/loadInitialData");

    		if (res.ok) {
    			const initialGoalscorers = await res.json();
    			console.log("Contados " + initialGoalscorers.length + " datos de goleadores.");
    			ReloadTableAlert$2();
    			getGoalscorers();
    		} else {
    			console.log("No se han cargado correctamente los datos iniciales");
    		}
    	}

    	async function getGoals() {
    		const res = await fetch(BASE_API_URL + "/goalscorers");

    		if (res.ok) {
    			const json = await res.json();

    			totalGoals = json.map(d => {
    				return d.goals; //Guardamos los años en un array
    			});

    			totalGoals = Array.from(new Set(totalGoals)); //Eliminamos años repetidos
    			console.log("Contados " + totalGoals.length + " goles.");
    		} else {
    			console.log("Error");
    		}
    	}

    	async function getGoalscorers() {
    		console.log("Fetching goalscorers...");
    		const res = await fetch(BASE_API_URL + "/goalscorers?offset=" + numberElementsPages * offset + "&limit=" + numberElementsPages);

    		if (res.ok) {
    			console.log("Ok:");
    			const json = await res.json();
    			$$invalidate(5, goalscorers = json);
    			console.log("Received " + goalscorers.length + " goalscorers.");

    			if (goalscorers.length != 10) {
    				$$invalidate(4, moreData = false);
    			} else {
    				const next = await fetch(BASE_API_URL + "/goalscorers?offset=" + numberElementsPages * (offset + 1) + "&limit=" + numberElementsPages);
    				console.log("La variable NEXT tiene el estado: " + next.status);
    				const jsonNext = await next.json();

    				if (jsonNext.length == 0 || next.status == 404) {
    					$$invalidate(4, moreData = false);
    				} else {
    					$$invalidate(4, moreData = true);
    				}
    			}
    		} else {
    			console.log("ERROR!");
    		}
    	}

    	async function insertGoalscorer() {
    		console.log("Inserting goalscorer..." + JSON.stringify(newGoalscorer));

    		if (newGoalscorer.debut == "" || newGoalscorer.debut == null || newGoalscorer.name == "" || newGoalscorer.name == null || newGoalscorer.goals == null || newGoalscorer.goals == "") {
    			alert("Se debe incluir el nombre, el año de debut y los goles del goleador obligatoriamente");
    		} else {
    			const res = await fetch(BASE_API_URL + "/goalscorers", {
    				method: "POST",
    				body: JSON.stringify(newGoalscorer),
    				headers: { "Content-Type": "application/json" }
    			}).then(function (res) {
    				if (res.ok) {
    					getGoalscorers();
    					insertAlert$2();
    				} else {
    					errorAlert$4("Error interno al intentar insertar un goleador");
    				}
    			});
    		}
    	}

    	async function deleteGoalscorer(name) {
    		console.log("Deleting goalscorer..." + JSON.stringify(name));

    		const res = await fetch(BASE_API_URL + "/goalscorers/" + name, { method: "DELETE" }).then(function (res) {
    			if (res.ok) {
    				getGoalscorers();
    				deleteAlert$2();
    			} else if (res.status == 404) {
    				errorAlert$4("El elemento que intentas borrar no existe");
    			} else {
    				errorAlert$4("Error al intentar borrar un elemento");
    			}
    		});
    	}

    	async function deleteGoalscorers() {
    		console.log("Deleting all goalscorers data...");

    		const res = await fetch(BASE_API_URL + "/goalscorers/", { method: "DELETE" }).then(function (res) {
    			if (res.ok) {
    				getGoalscorers();
    				deleteAllAlert$2();
    			} else {
    				errorAlert$4("Error al borrar todos los elementos");
    			}
    		});
    	}

    	async function search(name) {
    		console.log("Searching data: " + debut + " and " + team);

    		/* Checking if the fields are empty */
    		var url = BASE_API_URL + "/goalscorers";

    		if (debut != "-" && team != "-") {
    			url = url + "?debut=" + debut + "&team=" + team;
    		} else if (debut != "-" && team == "-") {
    			url = url + "?debut=" + debut;
    		} else if (debut == "-" && team != "-") {
    			url = url + "?team=" + team;
    		}

    		const res = await fetch(url);

    		if (res.ok) {
    			console.log("Ok:");
    			const json = await res.json();
    			$$invalidate(5, goalscorers = json);
    			console.log("Found " + goalscorers.length + " goalscorers stats.");
    		} else {
    			console.log("ERROR!");
    		}
    	}

    	function addOffset(increment) {
    		offset += increment;
    		$$invalidate(3, currentPage += increment);
    		getGoalscorers();
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1$6.warn(`<GoalscorersTable> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("GoalscorersTable", $$slots, []);

    	function input_value_binding(value) {
    		currentYear = value;
    		$$invalidate(1, currentYear);
    	}

    	function input_value_binding_1(value) {
    		currentTeam = value;
    		$$invalidate(2, currentTeam);
    	}

    	function input0_input_handler() {
    		newGoalscorer.name = this.value;
    		$$invalidate(0, newGoalscorer);
    	}

    	function input1_input_handler() {
    		newGoalscorer.country = this.value;
    		$$invalidate(0, newGoalscorer);
    	}

    	function input2_input_handler() {
    		newGoalscorer.debut = to_number(this.value);
    		$$invalidate(0, newGoalscorer);
    	}

    	function input3_input_handler() {
    		newGoalscorer.goals = to_number(this.value);
    		$$invalidate(0, newGoalscorer);
    	}

    	function input4_input_handler() {
    		newGoalscorer.matches = to_number(this.value);
    		$$invalidate(0, newGoalscorer);
    	}

    	function input5_input_handler() {
    		newGoalscorer.teams = to_number(this.value);
    		$$invalidate(0, newGoalscorer);
    	}

    	const click_handler = () => addOffset(-1);
    	const click_handler_1 = () => addOffset(-1);
    	const click_handler_2 = () => addOffset(1);
    	const click_handler_3 = () => addOffset(1);

    	$$self.$capture_state = () => ({
    		onMount,
    		pop,
    		Table,
    		Button,
    		Input,
    		Label,
    		FormGroup,
    		Pagination,
    		PaginationItem,
    		PaginationLink,
    		goalscorers,
    		newGoalscorer,
    		BASE_API_URL,
    		debutYears,
    		teams,
    		totalGoals,
    		currentYear,
    		currentTeam,
    		numberElementsPages,
    		offset,
    		currentPage,
    		moreData,
    		ReloadTable,
    		getGoals,
    		getGoalscorers,
    		insertGoalscorer,
    		deleteGoalscorer,
    		deleteGoalscorers,
    		search,
    		addOffset,
    		insertAlert: insertAlert$2,
    		deleteAlert: deleteAlert$2,
    		deleteAllAlert: deleteAllAlert$2,
    		ReloadTableAlert: ReloadTableAlert$2,
    		errorAlert: errorAlert$4,
    		clearAlert: clearAlert$4
    	});

    	$$self.$inject_state = $$props => {
    		if ("goalscorers" in $$props) $$invalidate(5, goalscorers = $$props.goalscorers);
    		if ("newGoalscorer" in $$props) $$invalidate(0, newGoalscorer = $$props.newGoalscorer);
    		if ("BASE_API_URL" in $$props) BASE_API_URL = $$props.BASE_API_URL;
    		if ("debutYears" in $$props) $$invalidate(6, debutYears = $$props.debutYears);
    		if ("teams" in $$props) $$invalidate(7, teams = $$props.teams);
    		if ("totalGoals" in $$props) totalGoals = $$props.totalGoals;
    		if ("currentYear" in $$props) $$invalidate(1, currentYear = $$props.currentYear);
    		if ("currentTeam" in $$props) $$invalidate(2, currentTeam = $$props.currentTeam);
    		if ("numberElementsPages" in $$props) numberElementsPages = $$props.numberElementsPages;
    		if ("offset" in $$props) offset = $$props.offset;
    		if ("currentPage" in $$props) $$invalidate(3, currentPage = $$props.currentPage);
    		if ("moreData" in $$props) $$invalidate(4, moreData = $$props.moreData);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		newGoalscorer,
    		currentYear,
    		currentTeam,
    		currentPage,
    		moreData,
    		goalscorers,
    		debutYears,
    		teams,
    		ReloadTable,
    		insertGoalscorer,
    		deleteGoalscorer,
    		deleteGoalscorers,
    		search,
    		addOffset,
    		totalGoals,
    		offset,
    		BASE_API_URL,
    		numberElementsPages,
    		getGoals,
    		getGoalscorers,
    		input_value_binding,
    		input_value_binding_1,
    		input0_input_handler,
    		input1_input_handler,
    		input2_input_handler,
    		input3_input_handler,
    		input4_input_handler,
    		input5_input_handler,
    		click_handler,
    		click_handler_1,
    		click_handler_2,
    		click_handler_3
    	];
    }

    class GoalscorersTable extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$g, create_fragment$g, safe_not_equal, {}, [-1, -1]);

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "GoalscorersTable",
    			options,
    			id: create_fragment$g.name
    		});
    	}
    }

    /* src\front\GoalscorersGUI\App.svelte generated by Svelte v3.21.0 */
    const file$g = "src\\front\\GoalscorersGUI\\App.svelte";

    function create_fragment$h(ctx) {
    	let main;
    	let h1;
    	let t1;
    	let current;
    	const goalscorerstable = new GoalscorersTable({ $$inline: true });

    	const block = {
    		c: function create() {
    			main = element("main");
    			h1 = element("h1");
    			h1.textContent = "Administrador de datos de goleadores";
    			t1 = space();
    			create_component(goalscorerstable.$$.fragment);
    			attr_dev(h1, "class", "display-4");
    			set_style(h1, "text-align", "center");
    			add_location(h1, file$g, 5, 1, 92);
    			add_location(main, file$g, 4, 0, 83);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, h1);
    			append_dev(main, t1);
    			mount_component(goalscorerstable, main, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(goalscorerstable.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(goalscorerstable.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_component(goalscorerstable);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$h.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$h($$self, $$props, $$invalidate) {
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("App", $$slots, []);
    	$$self.$capture_state = () => ({ GoalscorersTable });
    	return [];
    }

    class App$2 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$h, create_fragment$h, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment$h.name
    		});
    	}
    }

    /* src\front\NotFound.svelte generated by Svelte v3.21.0 */

    const file$h = "src\\front\\NotFound.svelte";

    function create_fragment$i(ctx) {
    	let main;
    	let h1;

    	const block = {
    		c: function create() {
    			main = element("main");
    			h1 = element("h1");
    			h1.textContent = "Página no encontrada";
    			add_location(h1, file$h, 1, 4, 11);
    			add_location(main, file$h, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, h1);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$i.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$i($$self, $$props) {
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<NotFound> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("NotFound", $$slots, []);
    	return [];
    }

    class NotFound extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$i, create_fragment$i, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "NotFound",
    			options,
    			id: create_fragment$i.name
    		});
    	}
    }

    /* src\front\App.svelte generated by Svelte v3.21.0 */
    const file$i = "src\\front\\App.svelte";

    function create_fragment$j(ctx) {
    	let main;
    	let current;

    	const router = new Router({
    			props: { routes: /*routes*/ ctx[0] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			main = element("main");
    			create_component(router.$$.fragment);
    			add_location(main, file$i, 32, 0, 716);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			mount_component(router, main, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(router.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(router.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_component(router);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$j.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$j($$self, $$props, $$invalidate) {
    	const routes = {
    		"/": Home,
    		"/global-coef/:team/:year": EditCoef,
    		"/globalCoefAPI": App,
    		"/global-transfers/:year/:team": EditTransfer,
    		"/globaltransfersAPI": App$1,
    		"/goalscorersAPI": App$2,
    		"*": NotFound
    	};

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("App", $$slots, []);

    	$$self.$capture_state = () => ({
    		Router,
    		Home,
    		globalCoef: App,
    		EditCoef,
    		globalTransfers: App$1,
    		EditTransfer,
    		goalscorers: App$2,
    		NotFound,
    		routes
    	});

    	return [routes];
    }

    class App$3 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$j, create_fragment$j, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment$j.name
    		});
    	}
    }

    const app = new App$3({
    	target: document.querySelector('#SvelteApp')
    });

    return app;

}());
=======
var app=function(){"use strict";function t(){}function e(t,e){for(const n in e)t[n]=e[n];return t}function n(t){return t()}function o(){return Object.create(null)}function l(t){t.forEach(n)}function s(t){return"function"==typeof t}function r(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function c(e,...n){if(null==e)return t;const o=e.subscribe(...n);return o.unsubscribe?()=>o.unsubscribe():o}function a(t,e,n,o){if(t){const l=i(t,e,n,o);return t[0](l)}}function i(t,n,o,l){return t[1]&&l?e(o.ctx.slice(),t[1](l(n))):o.ctx}function u(t,e,n,o){if(t[2]&&o){const l=t[2](o(n));if(void 0===e.dirty)return l;if("object"==typeof l){const t=[],n=Math.max(e.dirty.length,l.length);for(let o=0;o<n;o+=1)t[o]=e.dirty[o]|l[o];return t}return e.dirty|l}return e.dirty}function d(t){const e={};for(const n in t)"$"!==n[0]&&(e[n]=t[n]);return e}function f(t,e){t.appendChild(e)}function $(t,e,n){t.insertBefore(e,n||null)}function p(t){t.parentNode.removeChild(t)}function m(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function g(t){return document.createElement(t)}function h(t){return document.createTextNode(t)}function y(){return h(" ")}function b(){return h("")}function v(t,e,n,o){return t.addEventListener(e,n,o),()=>t.removeEventListener(e,n,o)}function x(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function k(t,e){const n=Object.getOwnPropertyDescriptors(t.__proto__);for(const o in e)null==e[o]?t.removeAttribute(o):"style"===o?t.style.cssText=e[o]:"__value"===o||n[o]&&n[o].set?t[o]=e[o]:x(t,o,e[o])}function w(t){return""===t?void 0:+t}function _(t,e){e=""+e,t.data!==e&&(t.data=e)}function E(t,e){(null!=e||t.value)&&(t.value=e)}function T(t,e,n,o){t.style.setProperty(e,n,o?"important":"")}function O(t,e){for(let n=0;n<t.options.length;n+=1){const o=t.options[n];if(o.__value===e)return void(o.selected=!0)}}function N(t,e){for(let n=0;n<t.options.length;n+=1){const o=t.options[n];o.selected=~e.indexOf(o.__value)}}let I;function A(t){I=t}function L(){if(!I)throw new Error("Function called outside component initialization");return I}function S(t){L().$$.on_mount.push(t)}function C(){const t=L();return(e,n)=>{const o=t.$$.callbacks[e];if(o){const l=function(t,e){const n=document.createEvent("CustomEvent");return n.initCustomEvent(t,!1,!1,e),n}(e,n);o.slice().forEach(e=>{e.call(t,l)})}}}function P(t,e){const n=t.$$.callbacks[e.type];n&&n.slice().forEach(t=>t(e))}const j=[],M=[],H=[],R=[],z=Promise.resolve();let B=!1;function D(t){H.push(t)}function q(t){R.push(t)}let F=!1;const J=new Set;function X(){if(!F){F=!0;do{for(let t=0;t<j.length;t+=1){const e=j[t];A(e),U(e.$$)}for(j.length=0;M.length;)M.pop()();for(let t=0;t<H.length;t+=1){const e=H[t];J.has(e)||(J.add(e),e())}H.length=0}while(j.length);for(;R.length;)R.pop()();B=!1,F=!1,J.clear()}}function U(t){if(null!==t.fragment){t.update(),l(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(D)}}const Y=new Set;let Z;function G(){Z={r:0,c:[],p:Z}}function V(){Z.r||l(Z.c),Z=Z.p}function W(t,e){t&&t.i&&(Y.delete(t),t.i(e))}function K(t,e,n,o){if(t&&t.o){if(Y.has(t))return;Y.add(t),Z.c.push(()=>{Y.delete(t),o&&(n&&t.d(1),o())}),t.o(e)}}function Q(t,e){const n=e.token={};function o(t,o,l,s){if(e.token!==n)return;e.resolved=s;let r=e.ctx;void 0!==l&&(r=r.slice(),r[l]=s);const c=t&&(e.current=t)(r);let a=!1;e.block&&(e.blocks?e.blocks.forEach((t,n)=>{n!==o&&t&&(G(),K(t,1,1,()=>{e.blocks[n]=null}),V())}):e.block.d(1),c.c(),W(c,1),c.m(e.mount(),e.anchor),a=!0),e.block=c,e.blocks&&(e.blocks[o]=c),a&&X()}if((l=t)&&"object"==typeof l&&"function"==typeof l.then){const n=L();if(t.then(t=>{A(n),o(e.then,1,e.value,t),A(null)},t=>{A(n),o(e.catch,2,e.error,t),A(null)}),e.current!==e.pending)return o(e.pending,0),!0}else{if(e.current!==e.then)return o(e.then,1,e.value,t),!0;e.resolved=t}var l}function tt(t,e){const n={},o={},l={$$scope:1};let s=t.length;for(;s--;){const r=t[s],c=e[s];if(c){for(const t in r)t in c||(o[t]=1);for(const t in c)l[t]||(n[t]=c[t],l[t]=1);t[s]=c}else for(const t in r)l[t]=1}for(const t in o)t in n||(n[t]=void 0);return n}function et(t,e,n){const o=t.$$.props[e];void 0!==o&&(t.$$.bound[o]=n,n(t.$$.ctx[o]))}function nt(t){t&&t.c()}function ot(t,e,o){const{fragment:r,on_mount:c,on_destroy:a,after_update:i}=t.$$;r&&r.m(e,o),D(()=>{const e=c.map(n).filter(s);a?a.push(...e):l(e),t.$$.on_mount=[]}),i.forEach(D)}function lt(t,e){const n=t.$$;null!==n.fragment&&(l(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function st(t,e){-1===t.$$.dirty[0]&&(j.push(t),B||(B=!0,z.then(X)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function rt(e,n,s,r,c,a,i=[-1]){const u=I;A(e);const d=n.props||{},f=e.$$={fragment:null,ctx:null,props:a,update:t,not_equal:c,bound:o(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(u?u.$$.context:[]),callbacks:o(),dirty:i};let $=!1;if(f.ctx=s?s(e,d,(t,n,...o)=>{const l=o.length?o[0]:n;return f.ctx&&c(f.ctx[t],f.ctx[t]=l)&&(f.bound[t]&&f.bound[t](l),$&&st(e,t)),n}):[],f.update(),$=!0,l(f.before_update),f.fragment=!!r&&r(f.ctx),n.target){if(n.hydrate){const t=function(t){return Array.from(t.childNodes)}(n.target);f.fragment&&f.fragment.l(t),t.forEach(p)}else f.fragment&&f.fragment.c();n.intro&&W(e.$$.fragment),ot(e,n.target,n.anchor),X()}A(u)}class ct{$destroy(){lt(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(){}}const at=[];function it(t,e){return{subscribe:ut(t,e).subscribe}}function ut(e,n=t){let o;const l=[];function s(t){if(r(e,t)&&(e=t,o)){const t=!at.length;for(let t=0;t<l.length;t+=1){const n=l[t];n[1](),at.push(n,e)}if(t){for(let t=0;t<at.length;t+=2)at[t][0](at[t+1]);at.length=0}}}return{set:s,update:function(t){s(t(e))},subscribe:function(r,c=t){const a=[r,c];return l.push(a),1===l.length&&(o=n(s)||t),r(e),()=>{const t=l.indexOf(a);-1!==t&&l.splice(t,1),0===l.length&&(o(),o=null)}}}}function dt(e,n,o){const r=!Array.isArray(e),a=r?[e]:e,i=n.length<2;return it(o,e=>{let o=!1;const u=[];let d=0,f=t;const $=()=>{if(d)return;f();const o=n(r?u[0]:u,e);i?e(o):f=s(o)?o:t},p=a.map((t,e)=>c(t,t=>{u[e]=t,d&=~(1<<e),o&&$()},()=>{d|=1<<e}));return o=!0,$(),function(){l(p),f()}})}function ft(t){let e,n;var o=t[0];if(o){var l=new o({});l.$on("routeEvent",t[10])}return{c(){l&&nt(l.$$.fragment),e=b()},m(t,o){l&&ot(l,t,o),$(t,e,o),n=!0},p(t,n){if(o!==(o=t[0])){if(l){G();const t=l;K(t.$$.fragment,1,0,()=>{lt(t,1)}),V()}o?((l=new o({})).$on("routeEvent",t[10]),nt(l.$$.fragment),W(l.$$.fragment,1),ot(l,e.parentNode,e)):l=null}},i(t){n||(l&&W(l.$$.fragment,t),n=!0)},o(t){l&&K(l.$$.fragment,t),n=!1},d(t){t&&p(e),l&&lt(l,t)}}}function $t(t){let e,n;var o=t[0];function l(t){return{props:{params:t[1]}}}if(o){var s=new o(l(t));s.$on("routeEvent",t[9])}return{c(){s&&nt(s.$$.fragment),e=b()},m(t,o){s&&ot(s,t,o),$(t,e,o),n=!0},p(t,n){const r={};if(2&n&&(r.params=t[1]),o!==(o=t[0])){if(s){G();const t=s;K(t.$$.fragment,1,0,()=>{lt(t,1)}),V()}o?((s=new o(l(t))).$on("routeEvent",t[9]),nt(s.$$.fragment),W(s.$$.fragment,1),ot(s,e.parentNode,e)):s=null}else o&&s.$set(r)},i(t){n||(s&&W(s.$$.fragment,t),n=!0)},o(t){s&&K(s.$$.fragment,t),n=!1},d(t){t&&p(e),s&&lt(s,t)}}}function pt(t){let e,n,o,l;const s=[$t,ft],r=[];function c(t,e){return t[1]?0:1}return e=c(t),n=r[e]=s[e](t),{c(){n.c(),o=b()},m(t,n){r[e].m(t,n),$(t,o,n),l=!0},p(t,[l]){let a=e;e=c(t),e===a?r[e].p(t,l):(G(),K(r[a],1,1,()=>{r[a]=null}),V(),n=r[e],n||(n=r[e]=s[e](t),n.c()),W(n,1),n.m(o.parentNode,o))},i(t){l||(W(n),l=!0)},o(t){K(n),l=!1},d(t){r[e].d(t),t&&p(o)}}}function mt(){const t=window.location.href.indexOf("#/");let e=t>-1?window.location.href.substr(t+1):"/";const n=e.indexOf("?");let o="";return n>-1&&(o=e.substr(n+1),e=e.substr(0,n)),{location:e,querystring:o}}const gt=it(mt(),(function(t){const e=()=>{t(mt())};return window.addEventListener("hashchange",e,!1),function(){window.removeEventListener("hashchange",e,!1)}}));dt(gt,t=>t.location),dt(gt,t=>t.querystring);function ht(){return t=()=>{window.history.back()},new Promise(e=>{setTimeout(()=>{e(t())},0)});var t}function yt(e,n,o){let l,s=t;!function(t,e,n){t.$$.on_destroy.push(c(e,n))}(e,gt,t=>o(4,l=t)),e.$$.on_destroy.push(()=>s());let{routes:r={}}=n,{prefix:a=""}=n;class i{constructor(t,e){if(!e||"function"!=typeof e&&("object"!=typeof e||!0!==e._sveltesparouter))throw Error("Invalid component object");if(!t||"string"==typeof t&&(t.length<1||"/"!=t.charAt(0)&&"*"!=t.charAt(0))||"object"==typeof t&&!(t instanceof RegExp))throw Error('Invalid value for "path" argument');const{pattern:n,keys:o}=function(t,e){if(t instanceof RegExp)return{keys:!1,pattern:t};var n,o,l,s,r=[],c="",a=t.split("/");for(a[0]||a.shift();l=a.shift();)"*"===(n=l[0])?(r.push("wild"),c+="/(.*)"):":"===n?(o=l.indexOf("?",1),s=l.indexOf(".",1),r.push(l.substring(1,~o?o:~s?s:l.length)),c+=~o&&!~s?"(?:/([^/]+?))?":"/([^/]+?)",~s&&(c+=(~o?"?":"")+"\\"+l.substring(s))):c+="/"+l;return{keys:r,pattern:new RegExp("^"+c+(e?"(?=$|/)":"/?$"),"i")}}(t);this.path=t,"object"==typeof e&&!0===e._sveltesparouter?(this.component=e.route,this.conditions=e.conditions||[],this.userData=e.userData):(this.component=e,this.conditions=[],this.userData=void 0),this._pattern=n,this._keys=o}match(t){a&&t.startsWith(a)&&(t=t.substr(a.length)||"/");const e=this._pattern.exec(t);if(null===e)return null;if(!1===this._keys)return e;const n={};let o=0;for(;o<this._keys.length;)n[this._keys[o]]=e[++o]||null;return n}checkConditions(t){for(let e=0;e<this.conditions.length;e++)if(!this.conditions[e](t))return!1;return!0}}const u=[];r instanceof Map?r.forEach((t,e)=>{u.push(new i(e,t))}):Object.keys(r).forEach(t=>{u.push(new i(t,r[t]))});let d=null,f=null;const $=C(),p=(t,e)=>{setTimeout(()=>{$(t,e)},0)};return e.$set=t=>{"routes"in t&&o(2,r=t.routes),"prefix"in t&&o(3,a=t.prefix)},e.$$.update=()=>{if(17&e.$$.dirty){o(0,d=null);let t=0;for(;!d&&t<u.length;){const e=u[t].match(l.location);if(e){const n={component:u[t].component,name:u[t].component.name,location:l.location,querystring:l.querystring,userData:u[t].userData};if(!u[t].checkConditions(n)){p("conditionsFailed",n);break}o(0,d=u[t].component),e&&"object"==typeof e&&Object.keys(e).length?o(1,f=e):o(1,f=null),p("routeLoaded",n)}t++}}},[d,f,r,a,l,i,u,$,p,function(t){P(e,t)},function(t){P(e,t)}]}class bt extends ct{constructor(t){super(),rt(this,t,yt,pt,r,{routes:2,prefix:3})}}function vt(e){let n;return{c(){n=g("main"),n.innerHTML='<div class="div-home"><button type="button" class="btn btn-outline-success" onclick="window.location.href=&#39;#/globalCoefAPI&#39;"><i class="fa fa-percent" aria-hidden="true"></i> API de coef globales</button> \n\t\t<button type="button" class="btn btn-outline-info" onclick="window.location.href=&#39;#/globaltransfersAPI&#39;"><i class="fa fa-money" aria-hidden="true"></i> API de las transferencias del mercado de fichajes</button> \n\t\t<button type="button" class="btn btn-outline-success" onclick="window.location.href=&#39;#/goalscorersAPI&#39;"><i class="fas fa-futbol" aria-hidden="true"></i> API de goleadores</button></div>'},m(t,e){$(t,n,e)},p:t,i:t,o:t,d(t){t&&p(n)}}}class xt extends ct{constructor(t){super(),rt(this,t,null,vt,r,{})}}function kt(t){var e,n,o="";if(t)if("object"==typeof t)if(Array.isArray(t))for(e=0;e<t.length;e++)t[e]&&(n=kt(t[e]))&&(o&&(o+=" "),o+=n);else for(e in t)t[e]&&(n=kt(e))&&(o&&(o+=" "),o+=n);else"boolean"==typeof t||t.call||(o&&(o+=" "),o+=t);return o}function wt(){for(var t,e=0,n="";e<arguments.length;)(t=kt(arguments[e++]))&&(n&&(n+=" "),n+=t);return n}function _t(t,e,n){return!0===n||""===n?t?"col":"col-"+e:"auto"===n?t?"col-auto":`col-${e}-auto`:t?"col-"+n:`col-${e}-${n}`}function Et(t){const e={};for(const n of Object.keys(t))"children"!==n&&"$$scope"!==n&&"$$slots"!==n&&(e[n]=t[n]);return e}function Tt(t){let n,o;const l=t[13].default,s=a(l,t,t[12],null);let r=[t[3],{class:t[1]}],c={};for(let t=0;t<r.length;t+=1)c=e(c,r[t]);return{c(){n=g("table"),s&&s.c(),k(n,c)},m(t,e){$(t,n,e),s&&s.m(n,null),o=!0},p(t,e){s&&s.p&&4096&e&&s.p(i(l,t,t[12],null),u(l,t[12],e,null)),k(n,tt(r,[8&e&&t[3],2&e&&{class:t[1]}]))},i(t){o||(W(s,t),o=!0)},o(t){K(s,t),o=!1},d(t){t&&p(n),s&&s.d(t)}}}function Ot(t){let n,o,l;const s=t[13].default,r=a(s,t,t[12],null);let c=[t[3],{class:t[1]}],d={};for(let t=0;t<c.length;t+=1)d=e(d,c[t]);return{c(){n=g("div"),o=g("table"),r&&r.c(),k(o,d),x(n,"class",t[2])},m(t,e){$(t,n,e),f(n,o),r&&r.m(o,null),l=!0},p(t,e){r&&r.p&&4096&e&&r.p(i(s,t,t[12],null),u(s,t[12],e,null)),k(o,tt(c,[8&e&&t[3],2&e&&{class:t[1]}])),(!l||4&e)&&x(n,"class",t[2])},i(t){l||(W(r,t),l=!0)},o(t){K(r,t),l=!1},d(t){t&&p(n),r&&r.d(t)}}}function Nt(t){let e,n,o,l;const s=[Ot,Tt],r=[];function c(t,e){return t[0]?0:1}return e=c(t),n=r[e]=s[e](t),{c(){n.c(),o=b()},m(t,n){r[e].m(t,n),$(t,o,n),l=!0},p(t,[l]){let a=e;e=c(t),e===a?r[e].p(t,l):(G(),K(r[a],1,1,()=>{r[a]=null}),V(),n=r[e],n||(n=r[e]=s[e](t),n.c()),W(n,1),n.m(o.parentNode,o))},i(t){l||(W(n),l=!0)},o(t){K(n),l=!1},d(t){r[e].d(t),t&&p(o)}}}function It(t,n,o){let{class:l=""}=n,{size:s=""}=n,{bordered:r=!1}=n,{borderless:c=!1}=n,{striped:a=!1}=n,{dark:i=!1}=n,{hover:u=!1}=n,{responsive:f=!1}=n;const $=Et(n);let p,m,{$$slots:g={},$$scope:h}=n;return t.$set=t=>{o(11,n=e(e({},n),d(t))),"class"in t&&o(4,l=t.class),"size"in t&&o(5,s=t.size),"bordered"in t&&o(6,r=t.bordered),"borderless"in t&&o(7,c=t.borderless),"striped"in t&&o(8,a=t.striped),"dark"in t&&o(9,i=t.dark),"hover"in t&&o(10,u=t.hover),"responsive"in t&&o(0,f=t.responsive),"$$scope"in t&&o(12,h=t.$$scope)},t.$$.update=()=>{2032&t.$$.dirty&&o(1,p=wt(l,"table",!!s&&"table-"+s,!!r&&"table-bordered",!!c&&"table-borderless",!!a&&"table-striped",!!i&&"table-dark",!!u&&"table-hover")),1&t.$$.dirty&&o(2,m=!0===f?"table-responsive":"table-responsive-"+f)},n=d(n),[f,p,m,$,l,s,r,c,a,i,u,n,h,g]}class At extends ct{constructor(t){super(),rt(this,t,It,Nt,r,{class:4,size:5,bordered:6,borderless:7,striped:8,dark:9,hover:10,responsive:0})}}function Lt(t){let n,o,l;const s=t[19].default,r=a(s,t,t[18],null),c=r||function(t){let e,n,o,l;const s=[jt,Pt,Ct],r=[];function c(t,e){return t[1]?0:t[0]?1:2}return e=c(t),n=r[e]=s[e](t),{c(){n.c(),o=b()},m(t,n){r[e].m(t,n),$(t,o,n),l=!0},p(t,l){let a=e;e=c(t),e===a?r[e].p(t,l):(G(),K(r[a],1,1,()=>{r[a]=null}),V(),n=r[e],n||(n=r[e]=s[e](t),n.c()),W(n,1),n.m(o.parentNode,o))},i(t){l||(W(n),l=!0)},o(t){K(n),l=!1},d(t){r[e].d(t),t&&p(o)}}}(t);let d=[t[10],{id:t[4]},{class:t[8]},{disabled:t[2]},{value:t[6]},{"aria-label":t[7]||t[9]},{style:t[5]}],f={};for(let t=0;t<d.length;t+=1)f=e(f,d[t]);return{c(){n=g("button"),c&&c.c(),k(n,f)},m(e,s,r){$(e,n,s),c&&c.m(n,null),o=!0,r&&l(),l=v(n,"click",t[21])},p(t,e){r?r.p&&262144&e&&r.p(i(s,t,t[18],null),u(s,t[18],e,null)):c&&c.p&&262147&e&&c.p(t,e),k(n,tt(d,[1024&e&&t[10],16&e&&{id:t[4]},256&e&&{class:t[8]},4&e&&{disabled:t[2]},64&e&&{value:t[6]},640&e&&{"aria-label":t[7]||t[9]},32&e&&{style:t[5]}]))},i(t){o||(W(c,t),o=!0)},o(t){K(c,t),o=!1},d(t){t&&p(n),c&&c.d(t),l()}}}function St(t){let n,o,l,s,r;const c=[Ht,Mt],a=[];function i(t,e){return t[0]?0:1}o=i(t),l=a[o]=c[o](t);let u=[t[10],{id:t[4]},{class:t[8]},{disabled:t[2]},{href:t[3]},{"aria-label":t[7]||t[9]},{style:t[5]}],d={};for(let t=0;t<u.length;t+=1)d=e(d,u[t]);return{c(){n=g("a"),l.c(),k(n,d)},m(e,l,c){$(e,n,l),a[o].m(n,null),s=!0,c&&r(),r=v(n,"click",t[20])},p(t,e){let s=o;o=i(t),o===s?a[o].p(t,e):(G(),K(a[s],1,1,()=>{a[s]=null}),V(),l=a[o],l||(l=a[o]=c[o](t),l.c()),W(l,1),l.m(n,null)),k(n,tt(u,[1024&e&&t[10],16&e&&{id:t[4]},256&e&&{class:t[8]},4&e&&{disabled:t[2]},8&e&&{href:t[3]},640&e&&{"aria-label":t[7]||t[9]},32&e&&{style:t[5]}]))},i(t){s||(W(l),s=!0)},o(t){K(l),s=!1},d(t){t&&p(n),a[o].d(),r()}}}function Ct(t){let e;const n=t[19].default,o=a(n,t,t[18],null);return{c(){o&&o.c()},m(t,n){o&&o.m(t,n),e=!0},p(t,e){o&&o.p&&262144&e&&o.p(i(n,t,t[18],null),u(n,t[18],e,null))},i(t){e||(W(o,t),e=!0)},o(t){K(o,t),e=!1},d(t){o&&o.d(t)}}}function Pt(e){let n;return{c(){n=h(e[0])},m(t,e){$(t,n,e)},p(t,e){1&e&&_(n,t[0])},i:t,o:t,d(t){t&&p(n)}}}function jt(e){let n;return{c(){n=g("span"),n.textContent="×",x(n,"aria-hidden","true")},m(t,e){$(t,n,e)},p:t,i:t,o:t,d(t){t&&p(n)}}}function Mt(t){let e;const n=t[19].default,o=a(n,t,t[18],null);return{c(){o&&o.c()},m(t,n){o&&o.m(t,n),e=!0},p(t,e){o&&o.p&&262144&e&&o.p(i(n,t,t[18],null),u(n,t[18],e,null))},i(t){e||(W(o,t),e=!0)},o(t){K(o,t),e=!1},d(t){o&&o.d(t)}}}function Ht(e){let n;return{c(){n=h(e[0])},m(t,e){$(t,n,e)},p(t,e){1&e&&_(n,t[0])},i:t,o:t,d(t){t&&p(n)}}}function Rt(t){let e,n,o,l;const s=[St,Lt],r=[];function c(t,e){return t[3]?0:1}return e=c(t),n=r[e]=s[e](t),{c(){n.c(),o=b()},m(t,n){r[e].m(t,n),$(t,o,n),l=!0},p(t,[l]){let a=e;e=c(t),e===a?r[e].p(t,l):(G(),K(r[a],1,1,()=>{r[a]=null}),V(),n=r[e],n||(n=r[e]=s[e](t),n.c()),W(n,1),n.m(o.parentNode,o))},i(t){l||(W(n),l=!0)},o(t){K(n),l=!1},d(t){r[e].d(t),t&&p(o)}}}function zt(t,n,o){let{class:l=""}=n,{active:s=!1}=n,{block:r=!1}=n,{children:c}=n,{close:a=!1}=n,{color:i="secondary"}=n,{disabled:u=!1}=n,{href:f=""}=n,{id:$=""}=n,{outline:p=!1}=n,{size:m=""}=n,{style:g=""}=n,{value:h=""}=n;const y=Et(n);let b,v,x,{$$slots:k={},$$scope:w}=n;return t.$set=t=>{o(17,n=e(e({},n),d(t))),"class"in t&&o(11,l=t.class),"active"in t&&o(12,s=t.active),"block"in t&&o(13,r=t.block),"children"in t&&o(0,c=t.children),"close"in t&&o(1,a=t.close),"color"in t&&o(14,i=t.color),"disabled"in t&&o(2,u=t.disabled),"href"in t&&o(3,f=t.href),"id"in t&&o(4,$=t.id),"outline"in t&&o(15,p=t.outline),"size"in t&&o(16,m=t.size),"style"in t&&o(5,g=t.style),"value"in t&&o(6,h=t.value),"$$scope"in t&&o(18,w=t.$$scope)},t.$$.update=()=>{o(7,b=n["aria-label"]),129026&t.$$.dirty&&o(8,v=wt(l,{close:a},a||"btn",a||`btn${p?"-outline":""}-${i}`,!!m&&"btn-"+m,!!r&&"btn-block",{active:s})),2&t.$$.dirty&&o(9,x=a?"Close":null)},n=d(n),[c,a,u,f,$,g,h,b,v,x,y,l,s,r,i,p,m,n,w,k,function(e){P(t,e)},function(e){P(t,e)}]}class Bt extends ct{constructor(t){super(),rt(this,t,zt,Rt,r,{class:11,active:12,block:13,children:0,close:1,color:14,disabled:2,href:3,id:4,outline:15,size:16,style:5,value:6})}}function Dt(t){let n,o,s;const r=t[26].default,c=a(r,t,t[25],null);let d=[t[12],{id:t[6]},{multiple:!0},{class:t[10]},{name:t[7]},{disabled:t[9]}],f={};for(let t=0;t<d.length;t+=1)f=e(f,d[t]);return{c(){n=g("select"),c&&c.c(),k(n,f),void 0===t[1]&&D(()=>t[161].call(n))},m(e,r,a){$(e,n,r),c&&c.m(n,null),N(n,t[1]),o=!0,a&&l(s),s=[v(n,"blur",t[141]),v(n,"focus",t[142]),v(n,"change",t[143]),v(n,"input",t[144]),v(n,"change",t[161])]},p(t,e){c&&c.p&&33554432&e[0]&&c.p(i(r,t,t[25],null),u(r,t[25],e,null)),k(n,tt(d,[4096&e[0]&&t[12],64&e[0]&&{id:t[6]},{multiple:!0},1024&e[0]&&{class:t[10]},128&e[0]&&{name:t[7]},512&e[0]&&{disabled:t[9]}])),2&e[0]&&N(n,t[1])},i(t){o||(W(c,t),o=!0)},o(t){K(c,t),o=!1},d(t){t&&p(n),c&&c.d(t),l(s)}}}function qt(t){let n,o,s;const r=t[26].default,c=a(r,t,t[25],null);let d=[t[12],{id:t[6]},{class:t[10]},{name:t[7]},{disabled:t[9]}],f={};for(let t=0;t<d.length;t+=1)f=e(f,d[t]);return{c(){n=g("select"),c&&c.c(),k(n,f),void 0===t[1]&&D(()=>t[160].call(n))},m(e,r,a){$(e,n,r),c&&c.m(n,null),O(n,t[1]),o=!0,a&&l(s),s=[v(n,"blur",t[137]),v(n,"focus",t[138]),v(n,"change",t[139]),v(n,"input",t[140]),v(n,"change",t[160])]},p(t,e){c&&c.p&&33554432&e[0]&&c.p(i(r,t,t[25],null),u(r,t[25],e,null)),k(n,tt(d,[4096&e[0]&&t[12],64&e[0]&&{id:t[6]},1024&e[0]&&{class:t[10]},128&e[0]&&{name:t[7]},512&e[0]&&{disabled:t[9]}])),2&e[0]&&O(n,t[1])},i(t){o||(W(c,t),o=!0)},o(t){K(c,t),o=!1},d(t){t&&p(n),c&&c.d(t),l(s)}}}function Ft(n){let o,s,r=[n[12],{id:n[6]},{class:n[10]},{name:n[7]},{disabled:n[9]}],c={};for(let t=0;t<r.length;t+=1)c=e(c,r[t]);return{c(){o=g("textarea"),k(o,c)},m(t,e,r){$(t,o,e),E(o,n[1]),r&&l(s),s=[v(o,"blur",n[130]),v(o,"focus",n[131]),v(o,"keydown",n[132]),v(o,"keypress",n[133]),v(o,"keyup",n[134]),v(o,"change",n[135]),v(o,"input",n[136]),v(o,"input",n[159])]},p(t,e){k(o,tt(r,[4096&e[0]&&t[12],64&e[0]&&{id:t[6]},1024&e[0]&&{class:t[10]},128&e[0]&&{name:t[7]},512&e[0]&&{disabled:t[9]}])),2&e[0]&&E(o,t[1])},i:t,o:t,d(t){t&&p(o),l(s)}}}function Jt(e){let n;function o(t,e){return"text"===t[3]?se:"password"===t[3]?le:"email"===t[3]?oe:"file"===t[3]?ne:"checkbox"===t[3]?ee:"radio"===t[3]?te:"url"===t[3]?Qt:"number"===t[3]?Kt:"date"===t[3]?Wt:"time"===t[3]?Vt:"datetime"===t[3]?Gt:"color"===t[3]?Zt:"range"===t[3]?Yt:"search"===t[3]?Ut:Xt}let l=o(e),s=l(e);return{c(){s.c(),n=b()},m(t,e){s.m(t,e),$(t,n,e)},p(t,e){l===(l=o(t))&&s?s.p(t,e):(s.d(1),s=l(t),s&&(s.c(),s.m(n.parentNode,n)))},i:t,o:t,d(t){s.d(t),t&&p(n)}}}function Xt(t){let n,o,s=[t[12],{id:t[6]},{type:t[3]},{readOnly:t[4]},{class:t[10]},{name:t[7]},{disabled:t[9]},{placeholder:t[8]},{value:t[1]}],r={};for(let t=0;t<s.length;t+=1)r=e(r,s[t]);return{c(){n=g("input"),k(n,r)},m(e,s,r){$(e,n,s),r&&l(o),o=[v(n,"blur",t[125]),v(n,"focus",t[126]),v(n,"keydown",t[127]),v(n,"keypress",t[128]),v(n,"keyup",t[129]),v(n,"input",t[13]),v(n,"change",t[13])]},p(t,e){k(n,tt(s,[4096&e[0]&&t[12],64&e[0]&&{id:t[6]},8&e[0]&&{type:t[3]},16&e[0]&&{readOnly:t[4]},1024&e[0]&&{class:t[10]},128&e[0]&&{name:t[7]},512&e[0]&&{disabled:t[9]},256&e[0]&&{placeholder:t[8]},2&e[0]&&{value:t[1]}]))},d(t){t&&p(n),l(o)}}}function Ut(t){let n,o,s=[t[12],{id:t[6]},{type:"search"},{readOnly:t[4]},{class:t[10]},{name:t[7]},{disabled:t[9]},{placeholder:t[8]}],r={};for(let t=0;t<s.length;t+=1)r=e(r,s[t]);return{c(){n=g("input"),k(n,r)},m(e,s,r){$(e,n,s),E(n,t[1]),r&&l(o),o=[v(n,"blur",t[118]),v(n,"focus",t[119]),v(n,"keydown",t[120]),v(n,"keypress",t[121]),v(n,"keyup",t[122]),v(n,"change",t[123]),v(n,"input",t[124]),v(n,"input",t[158])]},p(t,e){k(n,tt(s,[4096&e[0]&&t[12],64&e[0]&&{id:t[6]},{type:"search"},16&e[0]&&{readOnly:t[4]},1024&e[0]&&{class:t[10]},128&e[0]&&{name:t[7]},512&e[0]&&{disabled:t[9]},256&e[0]&&{placeholder:t[8]}])),2&e[0]&&E(n,t[1])},d(t){t&&p(n),l(o)}}}function Yt(t){let n,o,s=[t[12],{id:t[6]},{type:"range"},{readOnly:t[4]},{class:t[10]},{name:t[7]},{disabled:t[9]},{placeholder:t[8]}],r={};for(let t=0;t<s.length;t+=1)r=e(r,s[t]);return{c(){n=g("input"),k(n,r)},m(e,s,r){$(e,n,s),E(n,t[1]),r&&l(o),o=[v(n,"blur",t[111]),v(n,"focus",t[112]),v(n,"keydown",t[113]),v(n,"keypress",t[114]),v(n,"keyup",t[115]),v(n,"change",t[116]),v(n,"input",t[117]),v(n,"change",t[157]),v(n,"input",t[157])]},p(t,e){k(n,tt(s,[4096&e[0]&&t[12],64&e[0]&&{id:t[6]},{type:"range"},16&e[0]&&{readOnly:t[4]},1024&e[0]&&{class:t[10]},128&e[0]&&{name:t[7]},512&e[0]&&{disabled:t[9]},256&e[0]&&{placeholder:t[8]}])),2&e[0]&&E(n,t[1])},d(t){t&&p(n),l(o)}}}function Zt(t){let n,o,s=[t[12],{id:t[6]},{type:"color"},{readOnly:t[4]},{class:t[10]},{name:t[7]},{disabled:t[9]},{placeholder:t[8]}],r={};for(let t=0;t<s.length;t+=1)r=e(r,s[t]);return{c(){n=g("input"),k(n,r)},m(e,s,r){$(e,n,s),E(n,t[1]),r&&l(o),o=[v(n,"blur",t[104]),v(n,"focus",t[105]),v(n,"keydown",t[106]),v(n,"keypress",t[107]),v(n,"keyup",t[108]),v(n,"change",t[109]),v(n,"input",t[110]),v(n,"input",t[156])]},p(t,e){k(n,tt(s,[4096&e[0]&&t[12],64&e[0]&&{id:t[6]},{type:"color"},16&e[0]&&{readOnly:t[4]},1024&e[0]&&{class:t[10]},128&e[0]&&{name:t[7]},512&e[0]&&{disabled:t[9]},256&e[0]&&{placeholder:t[8]}])),2&e[0]&&E(n,t[1])},d(t){t&&p(n),l(o)}}}function Gt(t){let n,o,s=[t[12],{id:t[6]},{type:"datetime"},{readOnly:t[4]},{class:t[10]},{name:t[7]},{disabled:t[9]},{placeholder:t[8]}],r={};for(let t=0;t<s.length;t+=1)r=e(r,s[t]);return{c(){n=g("input"),k(n,r)},m(e,s,r){$(e,n,s),E(n,t[1]),r&&l(o),o=[v(n,"blur",t[97]),v(n,"focus",t[98]),v(n,"keydown",t[99]),v(n,"keypress",t[100]),v(n,"keyup",t[101]),v(n,"change",t[102]),v(n,"input",t[103]),v(n,"input",t[155])]},p(t,e){k(n,tt(s,[4096&e[0]&&t[12],64&e[0]&&{id:t[6]},{type:"datetime"},16&e[0]&&{readOnly:t[4]},1024&e[0]&&{class:t[10]},128&e[0]&&{name:t[7]},512&e[0]&&{disabled:t[9]},256&e[0]&&{placeholder:t[8]}])),2&e[0]&&E(n,t[1])},d(t){t&&p(n),l(o)}}}function Vt(t){let n,o,s=[t[12],{id:t[6]},{type:"time"},{readOnly:t[4]},{class:t[10]},{name:t[7]},{disabled:t[9]},{placeholder:t[8]}],r={};for(let t=0;t<s.length;t+=1)r=e(r,s[t]);return{c(){n=g("input"),k(n,r)},m(e,s,r){$(e,n,s),E(n,t[1]),r&&l(o),o=[v(n,"blur",t[90]),v(n,"focus",t[91]),v(n,"keydown",t[92]),v(n,"keypress",t[93]),v(n,"keyup",t[94]),v(n,"change",t[95]),v(n,"input",t[96]),v(n,"input",t[154])]},p(t,e){k(n,tt(s,[4096&e[0]&&t[12],64&e[0]&&{id:t[6]},{type:"time"},16&e[0]&&{readOnly:t[4]},1024&e[0]&&{class:t[10]},128&e[0]&&{name:t[7]},512&e[0]&&{disabled:t[9]},256&e[0]&&{placeholder:t[8]}])),2&e[0]&&E(n,t[1])},d(t){t&&p(n),l(o)}}}function Wt(t){let n,o,s=[t[12],{id:t[6]},{type:"date"},{readOnly:t[4]},{class:t[10]},{name:t[7]},{disabled:t[9]},{placeholder:t[8]}],r={};for(let t=0;t<s.length;t+=1)r=e(r,s[t]);return{c(){n=g("input"),k(n,r)},m(e,s,r){$(e,n,s),E(n,t[1]),r&&l(o),o=[v(n,"blur",t[83]),v(n,"focus",t[84]),v(n,"keydown",t[85]),v(n,"keypress",t[86]),v(n,"keyup",t[87]),v(n,"change",t[88]),v(n,"input",t[89]),v(n,"input",t[153])]},p(t,e){k(n,tt(s,[4096&e[0]&&t[12],64&e[0]&&{id:t[6]},{type:"date"},16&e[0]&&{readOnly:t[4]},1024&e[0]&&{class:t[10]},128&e[0]&&{name:t[7]},512&e[0]&&{disabled:t[9]},256&e[0]&&{placeholder:t[8]}])),2&e[0]&&E(n,t[1])},d(t){t&&p(n),l(o)}}}function Kt(t){let n,o,s=[t[12],{id:t[6]},{type:"number"},{readOnly:t[4]},{class:t[10]},{name:t[7]},{disabled:t[9]},{placeholder:t[8]}],r={};for(let t=0;t<s.length;t+=1)r=e(r,s[t]);return{c(){n=g("input"),k(n,r)},m(e,s,r){$(e,n,s),E(n,t[1]),r&&l(o),o=[v(n,"blur",t[76]),v(n,"focus",t[77]),v(n,"keydown",t[78]),v(n,"keypress",t[79]),v(n,"keyup",t[80]),v(n,"change",t[81]),v(n,"input",t[82]),v(n,"input",t[152])]},p(t,e){k(n,tt(s,[4096&e[0]&&t[12],64&e[0]&&{id:t[6]},{type:"number"},16&e[0]&&{readOnly:t[4]},1024&e[0]&&{class:t[10]},128&e[0]&&{name:t[7]},512&e[0]&&{disabled:t[9]},256&e[0]&&{placeholder:t[8]}])),2&e[0]&&w(n.value)!==t[1]&&E(n,t[1])},d(t){t&&p(n),l(o)}}}function Qt(t){let n,o,s=[t[12],{id:t[6]},{type:"url"},{readOnly:t[4]},{class:t[10]},{name:t[7]},{disabled:t[9]},{placeholder:t[8]}],r={};for(let t=0;t<s.length;t+=1)r=e(r,s[t]);return{c(){n=g("input"),k(n,r)},m(e,s,r){$(e,n,s),E(n,t[1]),r&&l(o),o=[v(n,"blur",t[69]),v(n,"focus",t[70]),v(n,"keydown",t[71]),v(n,"keypress",t[72]),v(n,"keyup",t[73]),v(n,"change",t[74]),v(n,"input",t[75]),v(n,"input",t[151])]},p(t,e){k(n,tt(s,[4096&e[0]&&t[12],64&e[0]&&{id:t[6]},{type:"url"},16&e[0]&&{readOnly:t[4]},1024&e[0]&&{class:t[10]},128&e[0]&&{name:t[7]},512&e[0]&&{disabled:t[9]},256&e[0]&&{placeholder:t[8]}])),2&e[0]&&E(n,t[1])},d(t){t&&p(n),l(o)}}}function te(t){let n,o,s=[t[12],{id:t[6]},{type:"radio"},{readOnly:t[4]},{class:t[10]},{name:t[7]},{disabled:t[9]},{placeholder:t[8]}],r={};for(let t=0;t<s.length;t+=1)r=e(r,s[t]);return{c(){n=g("input"),k(n,r)},m(e,s,r){$(e,n,s),E(n,t[1]),r&&l(o),o=[v(n,"blur",t[62]),v(n,"focus",t[63]),v(n,"keydown",t[64]),v(n,"keypress",t[65]),v(n,"keyup",t[66]),v(n,"change",t[67]),v(n,"input",t[68]),v(n,"change",t[150])]},p(t,e){k(n,tt(s,[4096&e[0]&&t[12],64&e[0]&&{id:t[6]},{type:"radio"},16&e[0]&&{readOnly:t[4]},1024&e[0]&&{class:t[10]},128&e[0]&&{name:t[7]},512&e[0]&&{disabled:t[9]},256&e[0]&&{placeholder:t[8]}])),2&e[0]&&E(n,t[1])},d(t){t&&p(n),l(o)}}}function ee(t){let n,o,s=[t[12],{id:t[6]},{type:"checkbox"},{readOnly:t[4]},{class:t[10]},{name:t[7]},{disabled:t[9]},{placeholder:t[8]}],r={};for(let t=0;t<s.length;t+=1)r=e(r,s[t]);return{c(){n=g("input"),k(n,r)},m(e,s,r){$(e,n,s),n.checked=t[0],E(n,t[1]),r&&l(o),o=[v(n,"blur",t[55]),v(n,"focus",t[56]),v(n,"keydown",t[57]),v(n,"keypress",t[58]),v(n,"keyup",t[59]),v(n,"change",t[60]),v(n,"input",t[61]),v(n,"change",t[149])]},p(t,e){k(n,tt(s,[4096&e[0]&&t[12],64&e[0]&&{id:t[6]},{type:"checkbox"},16&e[0]&&{readOnly:t[4]},1024&e[0]&&{class:t[10]},128&e[0]&&{name:t[7]},512&e[0]&&{disabled:t[9]},256&e[0]&&{placeholder:t[8]}])),1&e[0]&&(n.checked=t[0]),2&e[0]&&E(n,t[1])},d(t){t&&p(n),l(o)}}}function ne(t){let n,o,s=[t[12],{id:t[6]},{type:"file"},{readOnly:t[4]},{class:t[10]},{name:t[7]},{disabled:t[9]},{placeholder:t[8]}],r={};for(let t=0;t<s.length;t+=1)r=e(r,s[t]);return{c(){n=g("input"),k(n,r)},m(e,s,r){$(e,n,s),r&&l(o),o=[v(n,"blur",t[48]),v(n,"focus",t[49]),v(n,"keydown",t[50]),v(n,"keypress",t[51]),v(n,"keyup",t[52]),v(n,"change",t[53]),v(n,"input",t[54]),v(n,"change",t[148])]},p(t,e){k(n,tt(s,[4096&e[0]&&t[12],64&e[0]&&{id:t[6]},{type:"file"},16&e[0]&&{readOnly:t[4]},1024&e[0]&&{class:t[10]},128&e[0]&&{name:t[7]},512&e[0]&&{disabled:t[9]},256&e[0]&&{placeholder:t[8]}]))},d(t){t&&p(n),l(o)}}}function oe(t){let n,o,s=[t[12],{id:t[6]},{type:"email"},{readOnly:t[4]},{class:t[10]},{name:t[7]},{disabled:t[9]},{placeholder:t[8]}],r={};for(let t=0;t<s.length;t+=1)r=e(r,s[t]);return{c(){n=g("input"),k(n,r)},m(e,s,r){$(e,n,s),E(n,t[1]),r&&l(o),o=[v(n,"blur",t[41]),v(n,"focus",t[42]),v(n,"keydown",t[43]),v(n,"keypress",t[44]),v(n,"keyup",t[45]),v(n,"change",t[46]),v(n,"input",t[47]),v(n,"input",t[147])]},p(t,e){k(n,tt(s,[4096&e[0]&&t[12],64&e[0]&&{id:t[6]},{type:"email"},16&e[0]&&{readOnly:t[4]},1024&e[0]&&{class:t[10]},128&e[0]&&{name:t[7]},512&e[0]&&{disabled:t[9]},256&e[0]&&{placeholder:t[8]}])),2&e[0]&&n.value!==t[1]&&E(n,t[1])},d(t){t&&p(n),l(o)}}}function le(t){let n,o,s=[t[12],{id:t[6]},{type:"password"},{readOnly:t[4]},{class:t[10]},{name:t[7]},{disabled:t[9]},{placeholder:t[8]}],r={};for(let t=0;t<s.length;t+=1)r=e(r,s[t]);return{c(){n=g("input"),k(n,r)},m(e,s,r){$(e,n,s),E(n,t[1]),r&&l(o),o=[v(n,"blur",t[34]),v(n,"focus",t[35]),v(n,"keydown",t[36]),v(n,"keypress",t[37]),v(n,"keyup",t[38]),v(n,"change",t[39]),v(n,"input",t[40]),v(n,"input",t[146])]},p(t,e){k(n,tt(s,[4096&e[0]&&t[12],64&e[0]&&{id:t[6]},{type:"password"},16&e[0]&&{readOnly:t[4]},1024&e[0]&&{class:t[10]},128&e[0]&&{name:t[7]},512&e[0]&&{disabled:t[9]},256&e[0]&&{placeholder:t[8]}])),2&e[0]&&n.value!==t[1]&&E(n,t[1])},d(t){t&&p(n),l(o)}}}function se(t){let n,o,s=[t[12],{id:t[6]},{type:"text"},{readOnly:t[4]},{class:t[10]},{name:t[7]},{disabled:t[9]},{placeholder:t[8]}],r={};for(let t=0;t<s.length;t+=1)r=e(r,s[t]);return{c(){n=g("input"),k(n,r)},m(e,s,r){$(e,n,s),E(n,t[1]),r&&l(o),o=[v(n,"blur",t[27]),v(n,"focus",t[28]),v(n,"keydown",t[29]),v(n,"keypress",t[30]),v(n,"keyup",t[31]),v(n,"change",t[32]),v(n,"input",t[33]),v(n,"input",t[145])]},p(t,e){k(n,tt(s,[4096&e[0]&&t[12],64&e[0]&&{id:t[6]},{type:"text"},16&e[0]&&{readOnly:t[4]},1024&e[0]&&{class:t[10]},128&e[0]&&{name:t[7]},512&e[0]&&{disabled:t[9]},256&e[0]&&{placeholder:t[8]}])),2&e[0]&&n.value!==t[1]&&E(n,t[1])},d(t){t&&p(n),l(o)}}}function re(t){let e,n,o,l;const s=[Jt,Ft,qt,Dt],r=[];function c(t,e){return"input"===t[11]?0:"textarea"===t[11]?1:"select"!==t[11]||t[5]?"select"===t[11]&&t[5]?3:-1:2}return~(e=c(t))&&(n=r[e]=s[e](t)),{c(){n&&n.c(),o=b()},m(t,n){~e&&r[e].m(t,n),$(t,o,n),l=!0},p(t,l){let a=e;e=c(t),e===a?~e&&r[e].p(t,l):(n&&(G(),K(r[a],1,1,()=>{r[a]=null}),V()),~e?(n=r[e],n||(n=r[e]=s[e](t),n.c()),W(n,1),n.m(o.parentNode,o)):n=null)},i(t){l||(W(n),l=!0)},o(t){K(n),l=!1},d(t){~e&&r[e].d(t),t&&p(o)}}}function ce(t,n,o){let{class:l=""}=n,{type:s="text"}=n,{size:r}=n,{bsSize:c}=n,{color:a}=n,{checked:i=!1}=n,{valid:u=!1}=n,{invalid:f=!1}=n,{plaintext:$=!1}=n,{addon:p=!1}=n,{value:m=""}=n,{files:g=""}=n,{readonly:h}=n,{multiple:y=!1}=n,{id:b=""}=n,{name:v=""}=n,{placeholder:x=""}=n,{disabled:k=!1}=n;const{type:_,color:E,...T}=Et(n);let O,N;let{$$slots:I={},$$scope:A}=n;return t.$set=t=>{o(24,n=e(e({},n),d(t))),"class"in t&&o(16,l=t.class),"type"in t&&o(3,s=t.type),"size"in t&&o(14,r=t.size),"bsSize"in t&&o(15,c=t.bsSize),"color"in t&&o(17,a=t.color),"checked"in t&&o(0,i=t.checked),"valid"in t&&o(18,u=t.valid),"invalid"in t&&o(19,f=t.invalid),"plaintext"in t&&o(20,$=t.plaintext),"addon"in t&&o(21,p=t.addon),"value"in t&&o(1,m=t.value),"files"in t&&o(2,g=t.files),"readonly"in t&&o(4,h=t.readonly),"multiple"in t&&o(5,y=t.multiple),"id"in t&&o(6,b=t.id),"name"in t&&o(7,v=t.name),"placeholder"in t&&o(8,x=t.placeholder),"disabled"in t&&o(9,k=t.disabled),"$$scope"in t&&o(25,A=t.$$scope)},t.$$.update=()=>{if(4177928&t.$$.dirty[0]){const t=["radio","checkbox"].indexOf(s)>-1,e=new RegExp("\\D","g"),n="file"===s,i="textarea"===s,d="range"===s,m="button"===s||"reset"===s||"submit"===s,g="hidden"===s||"image"===s;o(11,N="select"===s||i?s:"input");let h="form-control";$?(h+="-plaintext",o(11,N="input")):n?h+="-file":t?h=p?null:"form-check-input":m?h="btn btn-"+(a||"secondary"):d?h="form-control-range":g&&(h=""),r&&e.test(r)&&(console.warn('Please use the prop "bsSize" instead of the "size" to bootstrap\'s input sizing.'),o(15,c=r),o(14,r=void 0)),o(10,O=wt(l,f&&"is-invalid",u&&"is-valid",!!c&&"form-control-"+c,h))}},n=d(n),[i,m,g,s,h,y,b,v,x,k,O,N,T,t=>{o(1,m=t.target.value)},r,c,l,a,u,f,$,p,_,E,n,A,I,function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(e){P(t,e)},function(){m=this.value,o(1,m)},function(){m=this.value,o(1,m)},function(){m=this.value,o(1,m)},function(){g=this.files,o(2,g)},function(){i=this.checked,m=this.value,o(0,i),o(1,m)},function(){m=this.value,o(1,m)},function(){m=this.value,o(1,m)},function(){m=w(this.value),o(1,m)},function(){m=this.value,o(1,m)},function(){m=this.value,o(1,m)},function(){m=this.value,o(1,m)},function(){m=this.value,o(1,m)},function(){m=w(this.value),o(1,m)},function(){m=this.value,o(1,m)},function(){m=this.value,o(1,m)},function(){m=function(t){const e=t.querySelector(":checked")||t.options[0];return e&&e.__value}(this),o(1,m)},function(){var t;t=this,m=[].map.call(t.querySelectorAll(":checked"),t=>t.__value),o(1,m)}]}class ae extends ct{constructor(t){super(),rt(this,t,ce,re,r,{class:16,type:3,size:14,bsSize:15,color:17,checked:0,valid:18,invalid:19,plaintext:20,addon:21,value:1,files:2,readonly:4,multiple:5,id:6,name:7,placeholder:8,disabled:9},[-1,-1,-1,-1,-1,-1])}}function ie(t){let n,o;const l=t[18].default,s=a(l,t,t[17],null);let r=[t[3],{id:t[1]},{class:t[2]},{for:t[0]}],c={};for(let t=0;t<r.length;t+=1)c=e(c,r[t]);return{c(){n=g("label"),s&&s.c(),k(n,c)},m(t,e){$(t,n,e),s&&s.m(n,null),o=!0},p(t,[e]){s&&s.p&&131072&e&&s.p(i(l,t,t[17],null),u(l,t[17],e,null)),k(n,tt(r,[8&e&&t[3],2&e&&{id:t[1]},4&e&&{class:t[2]},1&e&&{for:t[0]}]))},i(t){o||(W(s,t),o=!0)},o(t){K(s,t),o=!1},d(t){t&&p(n),s&&s.d(t)}}}function ue(t,n,o){let{class:l=""}=n;const s=Et(n);let{hidden:r=!1}=n,{check:c=!1}=n,{size:a=""}=n,{for:i}=n,{id:u=""}=n,{xs:f=""}=n,{sm:$=""}=n,{md:p=""}=n,{lg:m=""}=n,{xl:g=""}=n;const h={xs:f,sm:$,md:p,lg:m,xl:g};let{widths:y=Object.keys(h)}=n;const b=[];y.forEach(t=>{let e=n[t];if(!e&&""!==e)return;const o="xs"===t;let l;if(function(t){const e=typeof t;return null!=t&&("object"==e||"function"==e)}(e)){const n=o?"-":`-${t}-`;l=_t(o,t,e.size),b.push(wt({[l]:e.size||""===e.size,[`order${n}${e.order}`]:e.order||0===e.order,[`offset${n}${e.offset}`]:e.offset||0===e.offset}))}else l=_t(o,t,e),b.push(l)});let v,{$$slots:x={},$$scope:k}=n;return t.$set=t=>{o(16,n=e(e({},n),d(t))),"class"in t&&o(4,l=t.class),"hidden"in t&&o(5,r=t.hidden),"check"in t&&o(6,c=t.check),"size"in t&&o(7,a=t.size),"for"in t&&o(0,i=t.for),"id"in t&&o(1,u=t.id),"xs"in t&&o(8,f=t.xs),"sm"in t&&o(9,$=t.sm),"md"in t&&o(10,p=t.md),"lg"in t&&o(11,m=t.lg),"xl"in t&&o(12,g=t.xl),"widths"in t&&o(13,y=t.widths),"$$scope"in t&&o(17,k=t.$$scope)},t.$$.update=()=>{240&t.$$.dirty&&o(2,v=wt(l,!!r&&"sr-only",!!c&&"form-check-label",!!a&&"col-form-label-"+a,b,!!b.length&&"col-form-label"))},n=d(n),[i,u,v,s,l,r,c,a,f,$,p,m,g,y,h,b,n,k,x]}class de extends ct{constructor(t){super(),rt(this,t,ue,ie,r,{class:4,hidden:5,check:6,size:7,for:0,id:1,xs:8,sm:9,md:10,lg:11,xl:12,widths:13})}}function fe(t){let n,o;const l=t[11].default,s=a(l,t,t[10],null);let r=[t[3],{id:t[0]},{class:t[2]}],c={};for(let t=0;t<r.length;t+=1)c=e(c,r[t]);return{c(){n=g("div"),s&&s.c(),k(n,c)},m(t,e){$(t,n,e),s&&s.m(n,null),o=!0},p(t,e){s&&s.p&&1024&e&&s.p(i(l,t,t[10],null),u(l,t[10],e,null)),k(n,tt(r,[8&e&&t[3],1&e&&{id:t[0]},4&e&&{class:t[2]}]))},i(t){o||(W(s,t),o=!0)},o(t){K(s,t),o=!1},d(t){t&&p(n),s&&s.d(t)}}}function $e(t){let n,o;const l=t[11].default,s=a(l,t,t[10],null);let r=[t[3],{id:t[0]},{class:t[2]}],c={};for(let t=0;t<r.length;t+=1)c=e(c,r[t]);return{c(){n=g("fieldset"),s&&s.c(),k(n,c)},m(t,e){$(t,n,e),s&&s.m(n,null),o=!0},p(t,e){s&&s.p&&1024&e&&s.p(i(l,t,t[10],null),u(l,t[10],e,null)),k(n,tt(r,[8&e&&t[3],1&e&&{id:t[0]},4&e&&{class:t[2]}]))},i(t){o||(W(s,t),o=!0)},o(t){K(s,t),o=!1},d(t){t&&p(n),s&&s.d(t)}}}function pe(t){let e,n,o,l;const s=[$e,fe],r=[];function c(t,e){return"fieldset"===t[1]?0:1}return e=c(t),n=r[e]=s[e](t),{c(){n.c(),o=b()},m(t,n){r[e].m(t,n),$(t,o,n),l=!0},p(t,[l]){let a=e;e=c(t),e===a?r[e].p(t,l):(G(),K(r[a],1,1,()=>{r[a]=null}),V(),n=r[e],n||(n=r[e]=s[e](t),n.c()),W(n,1),n.m(o.parentNode,o))},i(t){l||(W(n),l=!0)},o(t){K(n),l=!1},d(t){r[e].d(t),t&&p(o)}}}function me(t,n,o){let{class:l=""}=n,{row:s=!1}=n,{check:r=!1}=n,{inline:c=!1}=n,{disabled:a=!1}=n,{id:i=""}=n,{tag:u=null}=n;const f=Et(n);let $,{$$slots:p={},$$scope:m}=n;return t.$set=t=>{o(9,n=e(e({},n),d(t))),"class"in t&&o(4,l=t.class),"row"in t&&o(5,s=t.row),"check"in t&&o(6,r=t.check),"inline"in t&&o(7,c=t.inline),"disabled"in t&&o(8,a=t.disabled),"id"in t&&o(0,i=t.id),"tag"in t&&o(1,u=t.tag),"$$scope"in t&&o(10,m=t.$$scope)},t.$$.update=()=>{496&t.$$.dirty&&o(2,$=wt(l,!!s&&"row",r?"form-check":"form-group",!(!r||!c)&&"form-check-inline",!(!r||!a)&&"disabled"))},n=d(n),[i,u,$,f,l,s,r,c,a,n,m,p]}class ge extends ct{constructor(t){super(),rt(this,t,me,pe,r,{class:4,row:5,check:6,inline:7,disabled:8,id:0,tag:1})}}function he(t){let n,o,l;const s=t[9].default,r=a(s,t,t[8],null);let c=[t[3],{class:t[1]},{"aria-label":t[0]}],d={};for(let t=0;t<c.length;t+=1)d=e(d,c[t]);return{c(){n=g("nav"),o=g("ul"),r&&r.c(),x(o,"class",t[2]),k(n,d)},m(t,e){$(t,n,e),f(n,o),r&&r.m(o,null),l=!0},p(t,[e]){r&&r.p&&256&e&&r.p(i(s,t,t[8],null),u(s,t[8],e,null)),(!l||4&e)&&x(o,"class",t[2]),k(n,tt(c,[8&e&&t[3],2&e&&{class:t[1]},1&e&&{"aria-label":t[0]}]))},i(t){l||(W(r,t),l=!0)},o(t){K(r,t),l=!1},d(t){t&&p(n),r&&r.d(t)}}}function ye(t,n,o){let{class:l=""}=n,{listClassName:s=""}=n,{size:r=""}=n,{ariaLabel:c="pagination"}=n;const a=Et(n);let i,u,{$$slots:f={},$$scope:$}=n;return t.$set=t=>{o(7,n=e(e({},n),d(t))),"class"in t&&o(4,l=t.class),"listClassName"in t&&o(5,s=t.listClassName),"size"in t&&o(6,r=t.size),"ariaLabel"in t&&o(0,c=t.ariaLabel),"$$scope"in t&&o(8,$=t.$$scope)},t.$$.update=()=>{16&t.$$.dirty&&o(1,i=wt(l)),96&t.$$.dirty&&o(2,u=wt(s,"pagination",{["pagination-"+r]:!!r}))},n=d(n),[c,i,u,a,l,s,r,n,$,f]}class be extends ct{constructor(t){super(),rt(this,t,ye,he,r,{class:4,listClassName:5,size:6,ariaLabel:0})}}function ve(t){let n,o;const l=t[7].default,s=a(l,t,t[6],null);let r=[t[1],{class:t[0]}],c={};for(let t=0;t<r.length;t+=1)c=e(c,r[t]);return{c(){n=g("li"),s&&s.c(),k(n,c)},m(t,e){$(t,n,e),s&&s.m(n,null),o=!0},p(t,[e]){s&&s.p&&64&e&&s.p(i(l,t,t[6],null),u(l,t[6],e,null)),k(n,tt(r,[2&e&&t[1],1&e&&{class:t[0]}]))},i(t){o||(W(s,t),o=!0)},o(t){K(s,t),o=!1},d(t){t&&p(n),s&&s.d(t)}}}function xe(t,n,o){let{class:l=""}=n,{active:s=!1}=n,{disabled:r=!1}=n;const c=Et(n);let a,{$$slots:i={},$$scope:u}=n;return t.$set=t=>{o(5,n=e(e({},n),d(t))),"class"in t&&o(2,l=t.class),"active"in t&&o(3,s=t.active),"disabled"in t&&o(4,r=t.disabled),"$$scope"in t&&o(6,u=t.$$scope)},t.$$.update=()=>{28&t.$$.dirty&&o(0,a=wt(l,"page-item",{active:s,disabled:r}))},n=d(n),[a,c,l,s,r,n,u,i]}class ke extends ct{constructor(t){super(),rt(this,t,xe,ve,r,{class:2,active:3,disabled:4})}}function we(t){let e;const n=t[14].default,o=a(n,t,t[13],null);return{c(){o&&o.c()},m(t,n){o&&o.m(t,n),e=!0},p(t,e){o&&o.p&&8192&e&&o.p(i(n,t,t[13],null),u(n,t[13],e,null))},i(t){e||(W(o,t),e=!0)},o(t){K(o,t),e=!1},d(t){o&&o.d(t)}}}function _e(t){let e,n,o,l,s;const r=t[14].default,c=a(r,t,t[13],null),d=c||function(t){let e;return{c(){e=h(t[5])},m(t,n){$(t,e,n)},p(t,n){32&n&&_(e,t[5])},d(t){t&&p(e)}}}(t);return{c(){e=g("span"),d&&d.c(),n=y(),o=g("span"),l=h(t[7]),x(e,"aria-hidden","true"),x(o,"class","sr-only")},m(t,r){$(t,e,r),d&&d.m(e,null),$(t,n,r),$(t,o,r),f(o,l),s=!0},p(t,e){c?c.p&&8192&e&&c.p(i(r,t,t[13],null),u(r,t[13],e,null)):d&&d.p&&32&e&&d.p(t,e),(!s||128&e)&&_(l,t[7])},i(t){s||(W(d,t),s=!0)},o(t){K(d,t),s=!1},d(t){t&&p(e),d&&d.d(t),t&&p(n),t&&p(o)}}}function Ee(t){let n,o,l,s,r;const c=[_e,we],a=[];function i(t,e){return t[1]||t[0]||t[2]||t[3]?0:1}o=i(t),l=a[o]=c[o](t);let u=[t[8],{class:t[6]},{href:t[4]}],d={};for(let t=0;t<u.length;t+=1)d=e(d,u[t]);return{c(){n=g("a"),l.c(),k(n,d)},m(e,l,c){$(e,n,l),a[o].m(n,null),s=!0,c&&r(),r=v(n,"click",t[15])},p(t,[e]){let s=o;o=i(t),o===s?a[o].p(t,e):(G(),K(a[s],1,1,()=>{a[s]=null}),V(),l=a[o],l||(l=a[o]=c[o](t),l.c()),W(l,1),l.m(n,null)),k(n,tt(u,[256&e&&t[8],64&e&&{class:t[6]},16&e&&{href:t[4]}]))},i(t){s||(W(l),s=!0)},o(t){K(l),s=!1},d(t){t&&p(n),a[o].d(),r()}}}function Te(t,n,o){let{class:l=""}=n,{next:s=!1}=n,{previous:r=!1}=n,{first:c=!1}=n,{last:a=!1}=n,{ariaLabel:i=""}=n,{href:u=""}=n;const f=Et(n);let $,p,m,g,{$$slots:h={},$$scope:y}=n;return t.$set=t=>{o(12,n=e(e({},n),d(t))),"class"in t&&o(9,l=t.class),"next"in t&&o(0,s=t.next),"previous"in t&&o(1,r=t.previous),"first"in t&&o(2,c=t.first),"last"in t&&o(3,a=t.last),"ariaLabel"in t&&o(10,i=t.ariaLabel),"href"in t&&o(4,u=t.href),"$$scope"in t&&o(13,y=t.$$scope)},t.$$.update=()=>{512&t.$$.dirty&&o(6,m=wt(l,"page-link")),15&t.$$.dirty&&(r?o(11,$="Previous"):s?o(11,$="Next"):c?o(11,$="First"):a&&o(11,$="Last")),3072&t.$$.dirty&&o(7,g=i||$),15&t.$$.dirty&&(r?o(5,p="‹"):s?o(5,p="›"):c?o(5,p="«"):a&&o(5,p="»"))},n=d(n),[s,r,c,a,u,p,m,g,f,l,i,$,n,y,h,function(e){P(t,e)}]}class Oe extends ct{constructor(t){super(),rt(this,t,Te,Ee,r,{class:9,next:0,previous:1,first:2,last:3,ariaLabel:10,href:4})}}function Ne(t,e,n){const o=t.slice();return o[7]=e[n],o}function Ie(t,e,n){const o=t.slice();return o[31]=e[n],o}function Ae(t,e,n){const o=t.slice();return o[34]=e[n],o}function Le(e){return{c:t,m:t,p:t,i:t,o:t,d:t}}function Se(t){let e,n,o,l;const r=new ge({props:{$$slots:{default:[Me]},$$scope:{ctx:t}}}),c=new ge({props:{$$slots:{default:[Be]},$$scope:{ctx:t}}}),a=new Bt({props:{outline:!0,color:"secondary",class:"button-search",$$slots:{default:[De]},$$scope:{ctx:t}}});a.$on("click",(function(){s(t[12](t[3],t[4]))&&t[12](t[3],t[4]).apply(this,arguments)}));const i=new At({props:{bordered:!0,$$slots:{default:[Xe]},$$scope:{ctx:t}}});return{c(){nt(r.$$.fragment),e=y(),nt(c.$$.fragment),n=y(),nt(a.$$.fragment),o=y(),nt(i.$$.fragment)},m(t,s){ot(r,t,s),$(t,e,s),ot(c,t,s),$(t,n,s),ot(a,t,s),$(t,o,s),ot(i,t,s),l=!0},p(e,n){t=e;const o={};10&n[0]|64&n[1]&&(o.$$scope={dirty:n,ctx:t}),r.$set(o);const l={};20&n[0]|64&n[1]&&(l.$$scope={dirty:n,ctx:t}),c.$set(l);const s={};64&n[1]&&(s.$$scope={dirty:n,ctx:t}),a.$set(s);const u={};129&n[0]|64&n[1]&&(u.$$scope={dirty:n,ctx:t}),i.$set(u)},i(t){l||(W(r.$$.fragment,t),W(c.$$.fragment,t),W(a.$$.fragment,t),W(i.$$.fragment,t),l=!0)},o(t){K(r.$$.fragment,t),K(c.$$.fragment,t),K(a.$$.fragment,t),K(i.$$.fragment,t),l=!1},d(t){lt(r,t),t&&p(e),lt(c,t),t&&p(n),lt(a,t),t&&p(o),lt(i,t)}}}function Ce(t){let e;return{c(){e=h("Búsqueda por equipo")},m(t,n){$(t,e,n)},d(t){t&&p(e)}}}function Pe(t){let e,n,o,l=t[34]+"";return{c(){e=g("option"),n=h(l),e.__value=o=t[34],e.value=e.__value},m(t,o){$(t,e,o),f(e,n)},p(t,s){2&s[0]&&l!==(l=t[34]+"")&&_(n,l),2&s[0]&&o!==(o=t[34])&&(e.__value=o),e.value=e.__value},d(t){t&&p(e)}}}function je(t){let e,n,o=t[1],l=[];for(let e=0;e<o.length;e+=1)l[e]=Pe(Ae(t,o,e));return{c(){for(let t=0;t<l.length;t+=1)l[t].c();e=y(),n=g("option"),n.textContent="-",n.__value="-",n.value=n.__value},m(t,o){for(let e=0;e<l.length;e+=1)l[e].m(t,o);$(t,e,o),$(t,n,o)},p(t,n){if(2&n[0]){let s;for(o=t[1],s=0;s<o.length;s+=1){const r=Ae(t,o,s);l[s]?l[s].p(r,n):(l[s]=Pe(r),l[s].c(),l[s].m(e.parentNode,e))}for(;s<l.length;s+=1)l[s].d(1);l.length=o.length}},d(t){m(l,t),t&&p(e),t&&p(n)}}}function Me(t){let e,n,o;const l=new de({props:{for:"selectTeam",$$slots:{default:[Ce]},$$scope:{ctx:t}}});function s(e){t[17].call(null,e)}let r={type:"select",name:"selectTeam",id:"selectTeam",$$slots:{default:[je]},$$scope:{ctx:t}};void 0!==t[3]&&(r.value=t[3]);const c=new ae({props:r});return M.push(()=>et(c,"value",s)),{c(){nt(l.$$.fragment),e=y(),nt(c.$$.fragment)},m(t,n){ot(l,t,n),$(t,e,n),ot(c,t,n),o=!0},p(t,e){const o={};64&e[1]&&(o.$$scope={dirty:e,ctx:t}),l.$set(o);const s={};2&e[0]|64&e[1]&&(s.$$scope={dirty:e,ctx:t}),!n&&8&e[0]&&(n=!0,s.value=t[3],q(()=>n=!1)),c.$set(s)},i(t){o||(W(l.$$.fragment,t),W(c.$$.fragment,t),o=!0)},o(t){K(l.$$.fragment,t),K(c.$$.fragment,t),o=!1},d(t){lt(l,t),t&&p(e),lt(c,t)}}}function He(t){let e;return{c(){e=h("Año")},m(t,n){$(t,e,n)},d(t){t&&p(e)}}}function Re(t){let e,n,o,l=t[31]+"";return{c(){e=g("option"),n=h(l),e.__value=o=t[31],e.value=e.__value},m(t,o){$(t,e,o),f(e,n)},p(t,s){4&s[0]&&l!==(l=t[31]+"")&&_(n,l),4&s[0]&&o!==(o=t[31])&&(e.__value=o),e.value=e.__value},d(t){t&&p(e)}}}function ze(t){let e,n,o=t[2],l=[];for(let e=0;e<o.length;e+=1)l[e]=Re(Ie(t,o,e));return{c(){for(let t=0;t<l.length;t+=1)l[t].c();e=y(),n=g("option"),n.textContent="-",n.__value="-",n.value=n.__value},m(t,o){for(let e=0;e<l.length;e+=1)l[e].m(t,o);$(t,e,o),$(t,n,o)},p(t,n){if(4&n[0]){let s;for(o=t[2],s=0;s<o.length;s+=1){const r=Ie(t,o,s);l[s]?l[s].p(r,n):(l[s]=Re(r),l[s].c(),l[s].m(e.parentNode,e))}for(;s<l.length;s+=1)l[s].d(1);l.length=o.length}},d(t){m(l,t),t&&p(e),t&&p(n)}}}function Be(t){let e,n,o;const l=new de({props:{for:"selectYear",$$slots:{default:[He]},$$scope:{ctx:t}}});function s(e){t[18].call(null,e)}let r={type:"select",name:"selectYear",id:"selectYear",$$slots:{default:[ze]},$$scope:{ctx:t}};void 0!==t[4]&&(r.value=t[4]);const c=new ae({props:r});return M.push(()=>et(c,"value",s)),{c(){nt(l.$$.fragment),e=y(),nt(c.$$.fragment)},m(t,n){ot(l,t,n),$(t,e,n),ot(c,t,n),o=!0},p(t,e){const o={};64&e[1]&&(o.$$scope={dirty:e,ctx:t}),l.$set(o);const s={};4&e[0]|64&e[1]&&(s.$$scope={dirty:e,ctx:t}),!n&&16&e[0]&&(n=!0,s.value=t[4],q(()=>n=!1)),c.$set(s)},i(t){o||(W(l.$$.fragment,t),W(c.$$.fragment,t),o=!0)},o(t){K(l.$$.fragment,t),K(c.$$.fragment,t),o=!1},d(t){lt(l,t),t&&p(e),lt(c,t)}}}function De(t){let e,n;return{c(){e=g("i"),n=h(" Buscar"),x(e,"class","fas fa-search")},m(t,o){$(t,e,o),$(t,n,o)},d(t){t&&p(e),t&&p(n)}}}function qe(t){let e;return{c(){e=h("Insertar")},m(t,n){$(t,e,n)},d(t){t&&p(e)}}}function Fe(t){let e;return{c(){e=h("Eliminar")},m(t,n){$(t,e,n)},d(t){t&&p(e)}}}function Je(t){let e,n,o,l,r,c,a,i,u,d,m,b,v,k,w,E,T,O,N,I,A,L,S,C,P=t[7].country+"",j=t[7].year+"",M=t[7].team+"",H=t[7].coefficient+"",R=t[7].fed+"",z=t[7].classification+"";const B=new Bt({props:{outline:!0,color:"danger",$$slots:{default:[Fe]},$$scope:{ctx:t}}});return B.$on("click",(function(){s(t[10](t[7].team,t[7].year))&&t[10](t[7].team,t[7].year).apply(this,arguments)})),B.$on("click",an),{c(){e=g("tr"),n=g("td"),o=h(P),l=y(),r=g("td"),c=h(j),a=y(),i=g("td"),u=g("a"),d=h(M),b=y(),v=g("td"),k=h(H),w=y(),E=g("td"),T=h(R),O=y(),N=g("td"),I=h(z),A=y(),L=g("td"),nt(B.$$.fragment),S=y(),x(u,"href",m="#/global-coef/"+t[7].team+"/"+t[7].year)},m(t,s){$(t,e,s),f(e,n),f(n,o),f(e,l),f(e,r),f(r,c),f(e,a),f(e,i),f(i,u),f(u,d),f(e,b),f(e,v),f(v,k),f(e,w),f(e,E),f(E,T),f(e,O),f(e,N),f(N,I),f(e,A),f(e,L),ot(B,L,null),f(e,S),C=!0},p(e,n){t=e,(!C||128&n[0])&&P!==(P=t[7].country+"")&&_(o,P),(!C||128&n[0])&&j!==(j=t[7].year+"")&&_(c,j),(!C||128&n[0])&&M!==(M=t[7].team+"")&&_(d,M),(!C||128&n[0]&&m!==(m="#/global-coef/"+t[7].team+"/"+t[7].year))&&x(u,"href",m),(!C||128&n[0])&&H!==(H=t[7].coefficient+"")&&_(k,H),(!C||128&n[0])&&R!==(R=t[7].fed+"")&&_(T,R),(!C||128&n[0])&&z!==(z=t[7].classification+"")&&_(I,z);const l={};64&n[1]&&(l.$$scope={dirty:n,ctx:t}),B.$set(l)},i(t){C||(W(B.$$.fragment,t),C=!0)},o(t){K(B.$$.fragment,t),C=!1},d(t){t&&p(e),lt(B)}}}function Xe(t){let e,n,o,s,r,c,a,i,u,d,h,b,k,_,T,O,N,I,A,L,S,C,P,j,M,H;const R=new Bt({props:{outline:!0,color:"primary",$$slots:{default:[qe]},$$scope:{ctx:t}}});R.$on("click",t[9]);let z=t[7],B=[];for(let e=0;e<z.length;e+=1)B[e]=Je(Ne(t,z,e));const D=t=>K(B[t],1,1,()=>{B[t]=null});return{c(){e=g("thead"),e.innerHTML="<tr><th>País</th> \n\t\t\t\t\t<th>Año</th> \n\t\t\t\t\t<th>Equipo</th> \n\t\t\t\t\t<th>Coeficiente</th> \n\t\t\t\t\t<th>Fed</th> \n\t\t\t\t\t<th>Clasificación</th> \n\t\t\t\t\t<th>Acciones</th></tr>",n=y(),o=g("tbody"),s=g("tr"),r=g("td"),c=g("input"),a=y(),i=g("td"),u=g("input"),d=y(),h=g("td"),b=g("input"),k=y(),_=g("td"),T=g("input"),O=y(),N=g("td"),I=g("input"),A=y(),L=g("td"),S=g("input"),C=y(),P=g("td"),nt(R.$$.fragment),j=y();for(let t=0;t<B.length;t+=1)B[t].c();x(u,"type","number"),x(T,"type","number"),x(I,"type","number"),x(S,"type","number")},m(p,m,g){$(p,e,m),$(p,n,m),$(p,o,m),f(o,s),f(s,r),f(r,c),E(c,t[0].country),f(s,a),f(s,i),f(i,u),E(u,t[0].year),f(s,d),f(s,h),f(h,b),E(b,t[0].team),f(s,k),f(s,_),f(_,T),E(T,t[0].coefficient),f(s,O),f(s,N),f(N,I),E(I,t[0].fed),f(s,A),f(s,L),f(L,S),E(S,t[0].classification),f(s,C),f(s,P),ot(R,P,null),f(o,j);for(let t=0;t<B.length;t+=1)B[t].m(o,null);M=!0,g&&l(H),H=[v(c,"input",t[19]),v(u,"input",t[20]),v(b,"input",t[21]),v(T,"input",t[22]),v(I,"input",t[23]),v(S,"input",t[24])]},p(t,e){1&e[0]&&c.value!==t[0].country&&E(c,t[0].country),1&e[0]&&w(u.value)!==t[0].year&&E(u,t[0].year),1&e[0]&&b.value!==t[0].team&&E(b,t[0].team),1&e[0]&&w(T.value)!==t[0].coefficient&&E(T,t[0].coefficient),1&e[0]&&w(I.value)!==t[0].fed&&E(I,t[0].fed),1&e[0]&&w(S.value)!==t[0].classification&&E(S,t[0].classification);const n={};if(64&e[1]&&(n.$$scope={dirty:e,ctx:t}),R.$set(n),1152&e[0]){let n;for(z=t[7],n=0;n<z.length;n+=1){const l=Ne(t,z,n);B[n]?(B[n].p(l,e),W(B[n],1)):(B[n]=Je(l),B[n].c(),W(B[n],1),B[n].m(o,null))}for(G(),n=z.length;n<B.length;n+=1)D(n);V()}},i(t){if(!M){W(R.$$.fragment,t);for(let t=0;t<z.length;t+=1)W(B[t]);M=!0}},o(t){K(R.$$.fragment,t),B=B.filter(Boolean);for(let t=0;t<B.length;t+=1)K(B[t]);M=!1},d(t){t&&p(e),t&&p(n),t&&p(o),lt(R),m(B,t),l(H)}}}function Ue(e){let n;return{c(){n=h("Loading coef...")},m(t,e){$(t,n,e)},p:t,i:t,o:t,d(t){t&&p(n)}}}function Ye(e){let n;const o=new Oe({props:{previous:!0,href:"#/globalCoefAPI"}});return o.$on("click",e[25]),{c(){nt(o.$$.fragment)},m(t,e){ot(o,t,e),n=!0},p:t,i(t){n||(W(o.$$.fragment,t),n=!0)},o(t){K(o.$$.fragment,t),n=!1},d(t){lt(o,t)}}}function Ze(t){let e;const n=new ke({props:{$$slots:{default:[Ve]},$$scope:{ctx:t}}});return{c(){nt(n.$$.fragment)},m(t,o){ot(n,t,o),e=!0},p(t,e){const o={};32&e[0]|64&e[1]&&(o.$$scope={dirty:e,ctx:t}),n.$set(o)},i(t){e||(W(n.$$.fragment,t),e=!0)},o(t){K(n.$$.fragment,t),e=!1},d(t){lt(n,t)}}}function Ge(t){let e,n=t[5]-1+"";return{c(){e=h(n)},m(t,n){$(t,e,n)},p(t,o){32&o[0]&&n!==(n=t[5]-1+"")&&_(e,n)},d(t){t&&p(e)}}}function Ve(t){let e;const n=new Oe({props:{href:"#/globalCoefAPI",$$slots:{default:[Ge]},$$scope:{ctx:t}}});return n.$on("click",t[26]),{c(){nt(n.$$.fragment)},m(t,o){ot(n,t,o),e=!0},p(t,e){const o={};32&e[0]|64&e[1]&&(o.$$scope={dirty:e,ctx:t}),n.$set(o)},i(t){e||(W(n.$$.fragment,t),e=!0)},o(t){K(n.$$.fragment,t),e=!1},d(t){lt(n,t)}}}function We(t){let e;return{c(){e=h(t[5])},m(t,n){$(t,e,n)},p(t,n){32&n[0]&&_(e,t[5])},d(t){t&&p(e)}}}function Ke(t){let e;const n=new Oe({props:{href:"#/globalCoefAPI",$$slots:{default:[We]},$$scope:{ctx:t}}});return{c(){nt(n.$$.fragment)},m(t,o){ot(n,t,o),e=!0},p(t,e){const o={};32&e[0]|64&e[1]&&(o.$$scope={dirty:e,ctx:t}),n.$set(o)},i(t){e||(W(n.$$.fragment,t),e=!0)},o(t){K(n.$$.fragment,t),e=!1},d(t){lt(n,t)}}}function Qe(t){let e;const n=new ke({props:{$$slots:{default:[en]},$$scope:{ctx:t}}});return{c(){nt(n.$$.fragment)},m(t,o){ot(n,t,o),e=!0},p(t,e){const o={};32&e[0]|64&e[1]&&(o.$$scope={dirty:e,ctx:t}),n.$set(o)},i(t){e||(W(n.$$.fragment,t),e=!0)},o(t){K(n.$$.fragment,t),e=!1},d(t){lt(n,t)}}}function tn(t){let e,n=t[5]+1+"";return{c(){e=h(n)},m(t,n){$(t,e,n)},p(t,o){32&o[0]&&n!==(n=t[5]+1+"")&&_(e,n)},d(t){t&&p(e)}}}function en(t){let e;const n=new Oe({props:{href:"#/globalCoefAPI",$$slots:{default:[tn]},$$scope:{ctx:t}}});return n.$on("click",t[27]),{c(){nt(n.$$.fragment)},m(t,o){ot(n,t,o),e=!0},p(t,e){const o={};32&e[0]|64&e[1]&&(o.$$scope={dirty:e,ctx:t}),n.$set(o)},i(t){e||(W(n.$$.fragment,t),e=!0)},o(t){K(n.$$.fragment,t),e=!1},d(t){lt(n,t)}}}function nn(e){let n;const o=new Oe({props:{next:!0,href:"#/globalCoefAPI"}});return o.$on("click",e[28]),{c(){nt(o.$$.fragment)},m(t,e){ot(o,t,e),n=!0},p:t,i(t){n||(W(o.$$.fragment,t),n=!0)},o(t){K(o.$$.fragment,t),n=!1},d(t){lt(o,t)}}}function on(t){let e,n,o,l,s;const r=new ke({props:{class:1===t[5]?"disabled":"",$$slots:{default:[Ye]},$$scope:{ctx:t}}});let c=1!=t[5]&&Ze(t);const a=new ke({props:{active:!0,$$slots:{default:[Ke]},$$scope:{ctx:t}}});let i=t[6]&&Qe(t);const u=new ke({props:{class:t[6]?"":"disabled",$$slots:{default:[nn]},$$scope:{ctx:t}}});return{c(){nt(r.$$.fragment),e=y(),c&&c.c(),n=y(),nt(a.$$.fragment),o=y(),i&&i.c(),l=y(),nt(u.$$.fragment)},m(t,d){ot(r,t,d),$(t,e,d),c&&c.m(t,d),$(t,n,d),ot(a,t,d),$(t,o,d),i&&i.m(t,d),$(t,l,d),ot(u,t,d),s=!0},p(t,e){const o={};32&e[0]&&(o.class=1===t[5]?"disabled":""),64&e[1]&&(o.$$scope={dirty:e,ctx:t}),r.$set(o),1!=t[5]?c?(c.p(t,e),32&e[0]&&W(c,1)):(c=Ze(t),c.c(),W(c,1),c.m(n.parentNode,n)):c&&(G(),K(c,1,1,()=>{c=null}),V());const s={};32&e[0]|64&e[1]&&(s.$$scope={dirty:e,ctx:t}),a.$set(s),t[6]?i?(i.p(t,e),64&e[0]&&W(i,1)):(i=Qe(t),i.c(),W(i,1),i.m(l.parentNode,l)):i&&(G(),K(i,1,1,()=>{i=null}),V());const d={};64&e[0]&&(d.class=t[6]?"":"disabled"),64&e[1]&&(d.$$scope={dirty:e,ctx:t}),u.$set(d)},i(t){s||(W(r.$$.fragment,t),W(c),W(a.$$.fragment,t),W(i),W(u.$$.fragment,t),s=!0)},o(t){K(r.$$.fragment,t),K(c),K(a.$$.fragment,t),K(i),K(u.$$.fragment,t),s=!1},d(t){lt(r,t),t&&p(e),c&&c.d(t),t&&p(n),lt(a,t),t&&p(o),i&&i.d(t),t&&p(l),lt(u,t)}}}function ln(t){let e,n;return{c(){e=g("i"),n=h(" Atrás"),x(e,"class","fas fa-arrow-circle-left")},m(t,o){$(t,e,o),$(t,n,o)},d(t){t&&p(e),t&&p(n)}}}function sn(t){let e,n;return{c(){e=g("i"),n=h(" Borrar todo"),x(e,"class","fa fa-trash"),x(e,"aria-hidden","true")},m(t,o){$(t,e,o),$(t,n,o)},d(t){t&&p(e),t&&p(n)}}}function rn(t){let e,n;return{c(){e=g("i"),n=h(" Carga inicial de API"),x(e,"class","fas fa-sync-alt")},m(t,o){$(t,e,o),$(t,n,o)},d(t){t&&p(e),t&&p(n)}}}function cn(t){let e,n,o,l,s,r,c,a,i,u={ctx:t,current:null,token:null,pending:Ue,then:Se,catch:Le,value:7,blocks:[,,,]};Q(l=t[7],u);const d=new be({props:{style:"float:right;",ariaLabel:"Cambiar de página",$$slots:{default:[on]},$$scope:{ctx:t}}}),m=new Bt({props:{outline:!0,color:"secondary",$$slots:{default:[ln]},$$scope:{ctx:t}}});m.$on("click",ht);const h=new Bt({props:{outline:!0,color:"danger",$$slots:{default:[sn]},$$scope:{ctx:t}}});h.$on("click",t[11]),h.$on("click",un);const b=new Bt({props:{outline:!0,color:"primary",$$slots:{default:[rn]},$$scope:{ctx:t}}});return b.$on("click",t[8]),b.$on("click",dn),{c(){e=g("main"),n=g("div"),o=y(),u.block.c(),s=y(),nt(d.$$.fragment),r=y(),nt(m.$$.fragment),c=y(),nt(h.$$.fragment),a=y(),nt(b.$$.fragment),x(n,"role","alert"),x(n,"id","div_alert"),T(n,"display","none")},m(t,l){$(t,e,l),f(e,n),f(e,o),u.block.m(e,u.anchor=null),u.mount=()=>e,u.anchor=s,f(e,s),ot(d,e,null),f(e,r),ot(m,e,null),f(e,c),ot(h,e,null),f(e,a),ot(b,e,null),i=!0},p(e,n){if(t=e,u.ctx=t,128&n[0]&&l!==(l=t[7])&&Q(l,u));else{const e=t.slice();e[7]=u.resolved,u.block.p(e,n)}const o={};96&n[0]|64&n[1]&&(o.$$scope={dirty:n,ctx:t}),d.$set(o);const s={};64&n[1]&&(s.$$scope={dirty:n,ctx:t}),m.$set(s);const r={};64&n[1]&&(r.$$scope={dirty:n,ctx:t}),h.$set(r);const c={};64&n[1]&&(c.$$scope={dirty:n,ctx:t}),b.$set(c)},i(t){i||(W(u.block),W(d.$$.fragment,t),W(m.$$.fragment,t),W(h.$$.fragment,t),W(b.$$.fragment,t),i=!0)},o(t){for(let t=0;t<3;t+=1){K(u.blocks[t])}K(d.$$.fragment,t),K(m.$$.fragment,t),K(h.$$.fragment,t),K(b.$$.fragment,t),i=!1},d(t){t&&p(e),u.block.d(),u.token=null,u=null,lt(d),lt(m),lt(h),lt(b)}}}function an(){$n();var t=document.getElementById("div_alert");t.style="position: fixed; top: 0px; top: 2%; width: 90%;",t.className="alert alert-dismissible in alert-danger ",t.innerHTML="<strong> Dato borrado</strong> Se ha borrado el dato correctamente",setTimeout(()=>{$n()},3e3)}function un(){$n();var t=document.getElementById("div_alert");t.style="position: fixed; top: 0px; top: 2%; width: 90%;",t.className="alert alert-dismissible in alert-danger ",t.innerHTML="<strong> Datos borrados</strong> Se han borrado todos los datos correctamente",setTimeout(()=>{$n()},3e3)}function dn(){$n();var t=document.getElementById("div_alert");t.style="position: fixed; top: 0px; top: 2%; width: 90%;",t.className="alert alert-dismissible in alert-info ",t.innerHTML="<strong> Tabla Restaurada</strong> Se han cargado los datos iniciales",setTimeout(()=>{$n()},3e3)}function fn(t){$n();var e=document.getElementById("div_alert");e.style="position: fixed; top: 0px; top: 2%; width: 90%;",e.className="alert alert-dismissible in alert-danger ",e.innerHTML="<strong> Error</strong> Ha ocurrido un error "+t,setTimeout(()=>{$n()},3e3)}function $n(){var t=document.getElementById("div_alert");t.style="display: none; ",t.className="alert alert-dismissible in",t.innerHTML=""}function pn(t,e,n){let o=[],l={country:"",year:parseInt(""),team:"",coefficient:"",fed:"",classification:""},s=[],r=[],c="-",a="-",i=0,u=1,d=!0;async function f(){const t=await fetch("/api/v2/global-coef");if(t.ok){const e=await t.json();n(1,s=e.map(t=>t.team)),n(1,s=Array.from(new Set(s))),n(2,r=e.map(t=>t.year)),n(2,r=Array.from(new Set(r))),console.log("Contados "+s.length+"equipos y "+r.length+"años distintos.")}else console.log("ERROR")}async function $(){console.log("Fetching coef...");const t=await fetch("/api/v2/global-coef?offset="+10*i+"&limit=10");if(t.ok){console.log("Ok:");const e=await t.json();if(n(7,o=e),console.log("Received "+o.length+" coef."),10!=o.length)n(6,d=!1);else{const t=await fetch("/api/v2/global-coef?offset="+10*(i+1)+"&limit=10");console.log("La variable NEXT tiene el estado: "+t.status),0==(await t.json()).length||404==t.status?n(6,d=!1):n(6,d=!0)}}else console.log("ERROR")}function p(t){i+=t,n(5,u+=t),$()}S($),S(f);return[l,s,r,c,a,u,d,o,async function(){const t=await fetch("/api/v2/global-coef/loadInitialData");if(t.ok){const e=await t.json();console.log("Contados "+e.length+" datos de coef"),$()}else console.log("No se han cargado los datos inicales")},async function(){if(console.log("Inserting coef..."+JSON.stringify(l)),""==l.team||null==l.team||""==l.year||null==l.year)alert("Se debe incluir el nombre del equipo y año obligatoriamente");else{await fetch("/api/v2/global-coef",{method:"POST",body:JSON.stringify(l),headers:{"Content-Type":"application/json"}}).then((function(t){t.ok?($(),function(){$n();var t=document.getElementById("div_alert");t.style="position: fixed; top: 0px; top: 2%; width: 90%;",t.className="alert alert-dismissible in alert-success ",t.innerHTML="<strong> Dato insertado</strong> Se ha insertado el dato correctamente",setTimeout(()=>{$n()},3e3)}()):fn("Error interno al intentar insertar un elemento")}))}},async function(t,e){console.log("Deleting coef..."+JSON.stringify(t)+ +JSON.stringify(e)),await fetch("/api/v2/global-coef/"+t+"/"+e,{method:"DELETE"}).then((function(t){t.ok?($(),f(),an()):404==t.status?fn("Se ha intentado borrar un elemento inexistente."):fn("Error al borrar un elemento")}))},async function(){console.log("Deleting all coef data..."),await fetch("/api/v2/global-coef/",{method:"DELETE"}).then((function(t){if(t.ok){const e=t.json();n(7,o=e)}else fn("Error al borrar todos los elementos")}))},async function(t,e){console.log("Searching data: "+t+" and "+e);var l="/api/v2/global-coef";"-"!=t&&"-"!=e?l=l+"?team="+t+"&year="+e:"-"!=t&&"-"==e?l=l+"?team="+t:"-"==t&&"-"!=e&&(l=l+"?year="+e);const s=await fetch(l);if(s.ok){console.log("Ok:");const t=await s.json();n(7,o=t),console.log("Found "+o.length+" global coef stats.")}else console.log("ERROR")},p,i,f,$,function(t){c=t,n(3,c)},function(t){a=t,n(4,a)},function(){l.country=this.value,n(0,l)},function(){l.year=w(this.value),n(0,l)},function(){l.team=this.value,n(0,l)},function(){l.coefficient=w(this.value),n(0,l)},function(){l.fed=w(this.value),n(0,l)},function(){l.classification=w(this.value),n(0,l)},()=>p(-1),()=>p(-1),()=>p(1),()=>p(1)]}class mn extends ct{constructor(t){super(),rt(this,t,pn,cn,r,{},[-1,-1])}}function gn(e){let n,o,l,s;const r=new mn({});return{c(){n=g("main"),o=g("h1"),o.textContent="Administrador de Coef",l=y(),nt(r.$$.fragment),x(o,"class","display-4"),T(o,"text-align","center")},m(t,e){$(t,n,e),f(n,o),f(n,l),ot(r,n,null),s=!0},p:t,i(t){s||(W(r.$$.fragment,t),s=!0)},o(t){K(r.$$.fragment,t),s=!1},d(t){t&&p(n),lt(r)}}}class hn extends ct{constructor(t){super(),rt(this,t,null,gn,r,{})}}function yn(e){return{c:t,m:t,p:t,i:t,o:t,d:t}}function bn(t){let e;const n=new At({props:{bordered:!0,$$slots:{default:[xn]},$$scope:{ctx:t}}});return{c(){nt(n.$$.fragment)},m(t,o){ot(n,t,o),e=!0},p(t,e){const o={};32894&e&&(o.$$scope={dirty:e,ctx:t}),n.$set(o)},i(t){e||(W(n.$$.fragment,t),e=!0)},o(t){K(n.$$.fragment,t),e=!1},d(t){lt(n,t)}}}function vn(t){let e;return{c(){e=h("Actualizar")},m(t,n){$(t,e,n)},d(t){t&&p(e)}}}function xn(t){let e,n,o,s,r,c,a,i,u,d,m,b,k,T,O,N,I,A,L,S,C,P,j,M,H;const R=new Bt({props:{outline:!0,color:"primary",$$slots:{default:[vn]},$$scope:{ctx:t}}});return R.$on("click",t[9]),R.$on("click",On),{c(){e=g("thead"),e.innerHTML="<tr><th>País</th> \n                    <th>Año</th> \n                    <th>Equipo</th> \n                    <th>Coeficiente</th> \n                    <th>Fed</th> \n                    <th>Clasificación</th> \n                    <th>Acciones</th></tr>",n=y(),o=g("tbody"),s=g("tr"),r=g("td"),c=g("input"),a=y(),i=g("td"),u=h(t[2]),d=y(),m=g("td"),b=h(t[3]),k=y(),T=g("td"),O=g("input"),N=y(),I=g("td"),A=g("input"),L=y(),S=g("td"),C=g("input"),P=y(),j=g("td"),nt(R.$$.fragment),x(O,"type","number"),x(A,"type","number"),x(C,"type","number")},m(p,g,h){$(p,e,g),$(p,n,g),$(p,o,g),f(o,s),f(s,r),f(r,c),E(c,t[1]),f(s,a),f(s,i),f(i,u),f(s,d),f(s,m),f(m,b),f(s,k),f(s,T),f(T,O),E(O,t[4]),f(s,N),f(s,I),f(I,A),E(A,t[5]),f(s,L),f(s,S),f(S,C),E(C,t[6]),f(s,P),f(s,j),ot(R,j,null),M=!0,h&&l(H),H=[v(c,"input",t[11]),v(O,"input",t[12]),v(A,"input",t[13]),v(C,"input",t[14])]},p(t,e){2&e&&c.value!==t[1]&&E(c,t[1]),(!M||4&e)&&_(u,t[2]),(!M||8&e)&&_(b,t[3]),16&e&&w(O.value)!==t[4]&&E(O,t[4]),32&e&&w(A.value)!==t[5]&&E(A,t[5]),64&e&&w(C.value)!==t[6]&&E(C,t[6]);const n={};32768&e&&(n.$$scope={dirty:e,ctx:t}),R.$set(n)},i(t){M||(W(R.$$.fragment,t),M=!0)},o(t){K(R.$$.fragment,t),M=!1},d(t){t&&p(e),t&&p(n),t&&p(o),lt(R),l(H)}}}function kn(e){let n;return{c(){n=h("Loading coef...")},m(t,e){$(t,n,e)},p:t,i:t,o:t,d(t){t&&p(n)}}}function wn(t){let e,n,o;return{c(){e=g("p"),n=h("ERROR: "),o=h(t[7]),T(e,"color","red")},m(t,l){$(t,e,l),f(e,n),f(e,o)},p(t,e){128&e&&_(o,t[7])},d(t){t&&p(e)}}}function _n(t){let e;return{c(){e=h("Atrás")},m(t,n){$(t,e,n)},d(t){t&&p(e)}}}function En(t){let e,n,o,l,s,r,c,a,i,u,d,m,b=t[0].team+"",v={ctx:t,current:null,token:null,pending:kn,then:bn,catch:yn,value:8,blocks:[,,,]};Q(i=t[8],v);let k=t[7]&&wn(t);const w=new Bt({props:{outline:!0,color:"secondary",$$slots:{default:[_n]},$$scope:{ctx:t}}});return w.$on("click",ht),{c(){e=g("main"),n=g("div"),o=y(),l=g("h3"),s=h("Editar Coef "),r=g("strong"),c=h(b),a=y(),v.block.c(),u=y(),k&&k.c(),d=y(),nt(w.$$.fragment),x(n,"role","alert"),x(n,"id","div_alert"),T(n,"display","none")},m(t,i){$(t,e,i),f(e,n),f(e,o),f(e,l),f(l,s),f(l,r),f(r,c),f(e,a),v.block.m(e,v.anchor=null),v.mount=()=>e,v.anchor=u,f(e,u),k&&k.m(e,null),f(e,d),ot(w,e,null),m=!0},p(n,[o]){if(t=n,(!m||1&o)&&b!==(b=t[0].team+"")&&_(c,b),v.ctx=t,256&o&&i!==(i=t[8])&&Q(i,v));else{const e=t.slice();e[8]=v.resolved,v.block.p(e,o)}t[7]?k?k.p(t,o):(k=wn(t),k.c(),k.m(e,d)):k&&(k.d(1),k=null);const l={};32768&o&&(l.$$scope={dirty:o,ctx:t}),w.$set(l)},i(t){m||(W(v.block),W(w.$$.fragment,t),m=!0)},o(t){for(let t=0;t<3;t+=1){K(v.blocks[t])}K(w.$$.fragment,t),m=!1},d(t){t&&p(e),v.block.d(),v.token=null,v=null,k&&k.d(),lt(w)}}}function Tn(t){Nn();var e=document.getElementById("div_alert");e.style="position: fixed; top: 0px; top: 1%; width: 90%;",e.className="alert alert-dismissible in alert-danger ",e.innerHTML="<strong>ERROR</strong> Ha sucedido un error "+t,setTimeout(()=>{Nn()},3e3)}function On(){Nn();var t=document.getElementById("div_alert");t.style="position: fixed; top: 0px; top: 1%; width: 90%;",t.className="alert alert-dismissible in alert-info ",t.innerHTML="<strong>Dato actualizado</strong> El dato ha sido actualizado",setTimeout(()=>{Nn()},3e3)}function Nn(){var t=document.getElementById("div_alert");t.style="display: none; ",t.className="alert alert-dismissible in",t.innerHTML=""}function In(t,e,n){let{params:o={}}=e,l={},s="XXXX",r=2e3,c="ZZZZ",a=140,i=20,u=1,d="";async function f(){console.log("Fetching coef...");const t=await fetch("/api/v2/global-coef/"+o.team+"/"+o.year);if(t.ok){console.log("Ok:");const e=await t.json();n(8,l=e),n(1,s=l.country),n(2,r=l.year),n(3,c=l.team),n(4,a=l.coefficient),n(5,i=l.fed),n(6,u=l.classification),console.log("Received coef")}else n(7,d=t.status+": "+t.statusText),console.log("ERROR"+d)}return S(f),t.$set=t=>{"params"in t&&n(0,o=t.params)},[o,s,r,c,a,i,u,d,l,async function(){console.log("Updating coef..."+JSON.stringify(o.team)),await fetch("/api/v2/global-coef/"+o.team+"/"+o.year,{method:"PUT",body:JSON.stringify({country:s,year:parseInt(o.year),team:o.team,coefficient:a,fed:i,classification:u}),headers:{"Content-Type":"application/json"}}).then((function(t){t.ok?f():404==t.status?Tn("Se ha intentado borrar un elemento inexistente."):Tn("")}))},f,function(){s=this.value,n(1,s)},function(){a=w(this.value),n(4,a)},function(){i=w(this.value),n(5,i)},function(){u=w(this.value),n(6,u)}]}class An extends ct{constructor(t){super(),rt(this,t,In,En,r,{params:0})}}function Ln(t,e,n){const o=t.slice();return o[29]=e[n],o}function Sn(t,e,n){const o=t.slice();return o[32]=e[n],o}function Cn(t,e,n){const o=t.slice();return o[35]=e[n],o}function Pn(e){return{c:t,m:t,p:t,i:t,o:t,d:t}}function jn(t){let e,n,o,l,r;const c=new ge({props:{$$slots:{default:[zn]},$$scope:{ctx:t}}}),a=new ge({props:{$$slots:{default:[Fn]},$$scope:{ctx:t}}}),i=new Bt({props:{outline:!0,color:"secondary",class:"button-search",$$slots:{default:[Jn]},$$scope:{ctx:t}}});i.$on("click",(function(){s(t[12](t[3],t[4]))&&t[12](t[3],t[4]).apply(this,arguments)}));const u=new Bt({props:{color:"success",$$slots:{default:[Xn]},$$scope:{ctx:t}}});u.$on("click",t[8]),u.$on("click",$o);const d=new At({props:{bordered:!0,$$slots:{default:[Vn]},$$scope:{ctx:t}}});return{c(){nt(c.$$.fragment),e=y(),nt(a.$$.fragment),n=y(),nt(i.$$.fragment),o=y(),nt(u.$$.fragment),l=y(),nt(d.$$.fragment)},m(t,s){ot(c,t,s),$(t,e,s),ot(a,t,s),$(t,n,s),ot(i,t,s),$(t,o,s),ot(u,t,s),$(t,l,s),ot(d,t,s),r=!0},p(e,n){t=e;const o={};10&n[0]|128&n[1]&&(o.$$scope={dirty:n,ctx:t}),c.$set(o);const l={};20&n[0]|128&n[1]&&(l.$$scope={dirty:n,ctx:t}),a.$set(l);const s={};128&n[1]&&(s.$$scope={dirty:n,ctx:t}),i.$set(s);const r={};128&n[1]&&(r.$$scope={dirty:n,ctx:t}),u.$set(r);const f={};129&n[0]|128&n[1]&&(f.$$scope={dirty:n,ctx:t}),d.$set(f)},i(t){r||(W(c.$$.fragment,t),W(a.$$.fragment,t),W(i.$$.fragment,t),W(u.$$.fragment,t),W(d.$$.fragment,t),r=!0)},o(t){K(c.$$.fragment,t),K(a.$$.fragment,t),K(i.$$.fragment,t),K(u.$$.fragment,t),K(d.$$.fragment,t),r=!1},d(t){lt(c,t),t&&p(e),lt(a,t),t&&p(n),lt(i,t),t&&p(o),lt(u,t),t&&p(l),lt(d,t)}}}function Mn(t){let e;return{c(){e=h("Año")},m(t,n){$(t,e,n)},d(t){t&&p(e)}}}function Hn(t){let e,n,o,l=t[35]+"";return{c(){e=g("option"),n=h(l),e.__value=o=t[35],e.value=e.__value},m(t,o){$(t,e,o),f(e,n)},p(t,s){2&s[0]&&l!==(l=t[35]+"")&&_(n,l),2&s[0]&&o!==(o=t[35])&&(e.__value=o),e.value=e.__value},d(t){t&&p(e)}}}function Rn(t){let e,n,o=t[1],l=[];for(let e=0;e<o.length;e+=1)l[e]=Hn(Cn(t,o,e));return{c(){for(let t=0;t<l.length;t+=1)l[t].c();e=y(),n=g("option"),n.textContent="-",n.__value="-",n.value=n.__value},m(t,o){for(let e=0;e<l.length;e+=1)l[e].m(t,o);$(t,e,o),$(t,n,o)},p(t,n){if(2&n[0]){let s;for(o=t[1],s=0;s<o.length;s+=1){const r=Cn(t,o,s);l[s]?l[s].p(r,n):(l[s]=Hn(r),l[s].c(),l[s].m(e.parentNode,e))}for(;s<l.length;s+=1)l[s].d(1);l.length=o.length}},d(t){m(l,t),t&&p(e),t&&p(n)}}}function zn(t){let e,n,o;const l=new de({props:{for:"selectYear",$$slots:{default:[Mn]},$$scope:{ctx:t}}});function s(e){t[17].call(null,e)}let r={type:"select",name:"selectYear",id:"selectYear",$$slots:{default:[Rn]},$$scope:{ctx:t}};void 0!==t[3]&&(r.value=t[3]);const c=new ae({props:r});return M.push(()=>et(c,"value",s)),{c(){nt(l.$$.fragment),e=y(),nt(c.$$.fragment)},m(t,n){ot(l,t,n),$(t,e,n),ot(c,t,n),o=!0},p(t,e){const o={};128&e[1]&&(o.$$scope={dirty:e,ctx:t}),l.$set(o);const s={};2&e[0]|128&e[1]&&(s.$$scope={dirty:e,ctx:t}),!n&&8&e[0]&&(n=!0,s.value=t[3],q(()=>n=!1)),c.$set(s)},i(t){o||(W(l.$$.fragment,t),W(c.$$.fragment,t),o=!0)},o(t){K(l.$$.fragment,t),K(c.$$.fragment,t),o=!1},d(t){lt(l,t),t&&p(e),lt(c,t)}}}function Bn(t){let e;return{c(){e=h("Búsqueda por equipo")},m(t,n){$(t,e,n)},d(t){t&&p(e)}}}function Dn(t){let e,n,o,l=t[32]+"";return{c(){e=g("option"),n=h(l),e.__value=o=t[32],e.value=e.__value},m(t,o){$(t,e,o),f(e,n)},p(t,s){4&s[0]&&l!==(l=t[32]+"")&&_(n,l),4&s[0]&&o!==(o=t[32])&&(e.__value=o),e.value=e.__value},d(t){t&&p(e)}}}function qn(t){let e,n,o=t[2],l=[];for(let e=0;e<o.length;e+=1)l[e]=Dn(Sn(t,o,e));return{c(){for(let t=0;t<l.length;t+=1)l[t].c();e=y(),n=g("option"),n.textContent="-",n.__value="-",n.value=n.__value},m(t,o){for(let e=0;e<l.length;e+=1)l[e].m(t,o);$(t,e,o),$(t,n,o)},p(t,n){if(4&n[0]){let s;for(o=t[2],s=0;s<o.length;s+=1){const r=Sn(t,o,s);l[s]?l[s].p(r,n):(l[s]=Dn(r),l[s].c(),l[s].m(e.parentNode,e))}for(;s<l.length;s+=1)l[s].d(1);l.length=o.length}},d(t){m(l,t),t&&p(e),t&&p(n)}}}function Fn(t){let e,n,o;const l=new de({props:{for:"selectTeam",$$slots:{default:[Bn]},$$scope:{ctx:t}}});function s(e){t[18].call(null,e)}let r={type:"select",name:"selectTeam",id:"selectTeam",$$slots:{default:[qn]},$$scope:{ctx:t}};void 0!==t[4]&&(r.value=t[4]);const c=new ae({props:r});return M.push(()=>et(c,"value",s)),{c(){nt(l.$$.fragment),e=y(),nt(c.$$.fragment)},m(t,n){ot(l,t,n),$(t,e,n),ot(c,t,n),o=!0},p(t,e){const o={};128&e[1]&&(o.$$scope={dirty:e,ctx:t}),l.$set(o);const s={};4&e[0]|128&e[1]&&(s.$$scope={dirty:e,ctx:t}),!n&&16&e[0]&&(n=!0,s.value=t[4],q(()=>n=!1)),c.$set(s)},i(t){o||(W(l.$$.fragment,t),W(c.$$.fragment,t),o=!0)},o(t){K(l.$$.fragment,t),K(c.$$.fragment,t),o=!1},d(t){lt(l,t),t&&p(e),lt(c,t)}}}function Jn(t){let e,n;return{c(){e=g("i"),n=h(" Buscar"),x(e,"class","fas fa-search")},m(t,o){$(t,e,o),$(t,n,o)},d(t){t&&p(e),t&&p(n)}}}function Xn(t){let e,n;return{c(){e=g("i"),n=h(" Carga Inicial API"),x(e,"class","fa fa-refresh"),x(e,"aria-hidden","true")},m(t,o){$(t,e,o),$(t,n,o)},d(t){t&&p(e),t&&p(n)}}}function Un(t){let e,n;return{c(){e=g("i"),n=h(" Insertar"),x(e,"class","fa fa-plus-circle"),x(e,"aria-hidden","true")},m(t,o){$(t,e,o),$(t,n,o)},d(t){t&&p(e),t&&p(n)}}}function Yn(t){let e,n;return{c(){e=g("i"),n=h(" Eliminar"),x(e,"class","fa fa-trash"),x(e,"aria-hidden","true")},m(t,o){$(t,e,o),$(t,n,o)},d(t){t&&p(e),t&&p(n)}}}function Zn(t){let e,n;return{c(){e=g("i"),n=h(" Editar"),x(e,"class","fa fa-edit"),x(e,"aria-hidden","true")},m(t,o){$(t,e,o),$(t,n,o)},d(t){t&&p(e),t&&p(n)}}}function Gn(t){let e,n,o,l,r,c,a,i,u,d,m,b,v,x,k,w,E,T,O,N,I,A,L,S,C=t[29].country+"",P=t[29].year+"",j=t[29].team+"",M=t[29].signing+"",H=t[29].sale+"",R=t[29].balance+"";const z=new Bt({props:{outline:!0,color:"danger",$$slots:{default:[Yn]},$$scope:{ctx:t}}});z.$on("click",(function(){s(t[10](t[29].year,t[29].team))&&t[10](t[29].year,t[29].team).apply(this,arguments)}));const B=new Bt({props:{outline:!0,color:"info",href:"#/global-transfers/"+t[29].year+"/"+t[29].team,$$slots:{default:[Zn]},$$scope:{ctx:t}}});return{c(){e=g("tr"),n=g("td"),o=h(C),l=y(),r=g("td"),c=h(P),a=y(),i=g("td"),u=h(j),d=y(),m=g("td"),b=h(M),v=y(),x=g("td"),k=h(H),w=y(),E=g("td"),T=h(R),O=y(),N=g("td"),nt(z.$$.fragment),I=y(),A=g("td"),nt(B.$$.fragment),L=y()},m(t,s){$(t,e,s),f(e,n),f(n,o),f(e,l),f(e,r),f(r,c),f(e,a),f(e,i),f(i,u),f(e,d),f(e,m),f(m,b),f(e,v),f(e,x),f(x,k),f(e,w),f(e,E),f(E,T),f(e,O),f(e,N),ot(z,N,null),f(e,I),f(e,A),ot(B,A,null),f(e,L),S=!0},p(e,n){t=e,(!S||128&n[0])&&C!==(C=t[29].country+"")&&_(o,C),(!S||128&n[0])&&P!==(P=t[29].year+"")&&_(c,P),(!S||128&n[0])&&j!==(j=t[29].team+"")&&_(u,j),(!S||128&n[0])&&M!==(M=t[29].signing+"")&&_(b,M),(!S||128&n[0])&&H!==(H=t[29].sale+"")&&_(k,H),(!S||128&n[0])&&R!==(R=t[29].balance+"")&&_(T,R);const l={};128&n[1]&&(l.$$scope={dirty:n,ctx:t}),z.$set(l);const s={};128&n[0]&&(s.href="#/global-transfers/"+t[29].year+"/"+t[29].team),128&n[1]&&(s.$$scope={dirty:n,ctx:t}),B.$set(s)},i(t){S||(W(z.$$.fragment,t),W(B.$$.fragment,t),S=!0)},o(t){K(z.$$.fragment,t),K(B.$$.fragment,t),S=!1},d(t){t&&p(e),lt(z),lt(B)}}}function Vn(t){let e,n,o,s,r,c,a,i,u,d,h,b,k,_,T,O,N,I,A,L,S,C,P,j,M,H;const R=new Bt({props:{outline:!0,color:"primary",$$slots:{default:[Un]},$$scope:{ctx:t}}});R.$on("click",t[9]);let z=t[7],B=[];for(let e=0;e<z.length;e+=1)B[e]=Gn(Ln(t,z,e));const D=t=>K(B[t],1,1,()=>{B[t]=null});return{c(){e=g("thead"),e.innerHTML="<tr><th>Pais</th> \n\t\t\t\t\t<th>Año</th> \n\t\t\t\t\t<th>Equipo</th> \n\t\t\t\t\t<th>Fichajes</th> \n\t\t\t\t\t<th>Ventas</th> \n\t\t\t\t\t<th>Balance</th> \n\t\t\t\t\t<th>Acciones</th></tr>",n=y(),o=g("tbody"),s=g("tr"),r=g("td"),c=g("input"),a=y(),i=g("td"),u=g("input"),d=y(),h=g("td"),b=g("input"),k=y(),_=g("td"),T=g("input"),O=y(),N=g("td"),I=g("input"),A=y(),L=g("td"),S=g("input"),C=y(),P=g("td"),nt(R.$$.fragment),j=y();for(let t=0;t<B.length;t+=1)B[t].c();x(u,"type","number"),x(T,"type","number"),x(I,"type","number"),x(S,"type","number")},m(p,m,g){$(p,e,m),$(p,n,m),$(p,o,m),f(o,s),f(s,r),f(r,c),E(c,t[0].country),f(s,a),f(s,i),f(i,u),E(u,t[0].year),f(s,d),f(s,h),f(h,b),E(b,t[0].team),f(s,k),f(s,_),f(_,T),E(T,t[0].signing),f(s,O),f(s,N),f(N,I),E(I,t[0].sale),f(s,A),f(s,L),f(L,S),E(S,t[0].balance),f(s,C),f(s,P),ot(R,P,null),f(o,j);for(let t=0;t<B.length;t+=1)B[t].m(o,null);M=!0,g&&l(H),H=[v(c,"input",t[19]),v(u,"input",t[20]),v(b,"input",t[21]),v(T,"input",t[22]),v(I,"input",t[23]),v(S,"input",t[24])]},p(t,e){1&e[0]&&c.value!==t[0].country&&E(c,t[0].country),1&e[0]&&w(u.value)!==t[0].year&&E(u,t[0].year),1&e[0]&&b.value!==t[0].team&&E(b,t[0].team),1&e[0]&&w(T.value)!==t[0].signing&&E(T,t[0].signing),1&e[0]&&w(I.value)!==t[0].sale&&E(I,t[0].sale),1&e[0]&&w(S.value)!==t[0].balance&&E(S,t[0].balance);const n={};if(128&e[1]&&(n.$$scope={dirty:e,ctx:t}),R.$set(n),1152&e[0]){let n;for(z=t[7],n=0;n<z.length;n+=1){const l=Ln(t,z,n);B[n]?(B[n].p(l,e),W(B[n],1)):(B[n]=Gn(l),B[n].c(),W(B[n],1),B[n].m(o,null))}for(G(),n=z.length;n<B.length;n+=1)D(n);V()}},i(t){if(!M){W(R.$$.fragment,t);for(let t=0;t<z.length;t+=1)W(B[t]);M=!0}},o(t){K(R.$$.fragment,t),B=B.filter(Boolean);for(let t=0;t<B.length;t+=1)K(B[t]);M=!1},d(t){t&&p(e),t&&p(n),t&&p(o),lt(R),m(B,t),l(H)}}}function Wn(e){let n;return{c(){n=h("Loading transfers...")},m(t,e){$(t,n,e)},p:t,i:t,o:t,d(t){t&&p(n)}}}function Kn(e){let n;const o=new Oe({props:{previous:!0,href:"#/globalTransfersAPI"}});return o.$on("click",e[25]),{c(){nt(o.$$.fragment)},m(t,e){ot(o,t,e),n=!0},p:t,i(t){n||(W(o.$$.fragment,t),n=!0)},o(t){K(o.$$.fragment,t),n=!1},d(t){lt(o,t)}}}function Qn(t){let e;const n=new ke({props:{$$slots:{default:[eo]},$$scope:{ctx:t}}});return{c(){nt(n.$$.fragment)},m(t,o){ot(n,t,o),e=!0},p(t,e){const o={};32&e[0]|128&e[1]&&(o.$$scope={dirty:e,ctx:t}),n.$set(o)},i(t){e||(W(n.$$.fragment,t),e=!0)},o(t){K(n.$$.fragment,t),e=!1},d(t){lt(n,t)}}}function to(t){let e,n=t[5]-1+"";return{c(){e=h(n)},m(t,n){$(t,e,n)},p(t,o){32&o[0]&&n!==(n=t[5]-1+"")&&_(e,n)},d(t){t&&p(e)}}}function eo(t){let e;const n=new Oe({props:{href:"#/globalTransfersAPI",$$slots:{default:[to]},$$scope:{ctx:t}}});return n.$on("click",t[26]),{c(){nt(n.$$.fragment)},m(t,o){ot(n,t,o),e=!0},p(t,e){const o={};32&e[0]|128&e[1]&&(o.$$scope={dirty:e,ctx:t}),n.$set(o)},i(t){e||(W(n.$$.fragment,t),e=!0)},o(t){K(n.$$.fragment,t),e=!1},d(t){lt(n,t)}}}function no(t){let e;return{c(){e=h(t[5])},m(t,n){$(t,e,n)},p(t,n){32&n[0]&&_(e,t[5])},d(t){t&&p(e)}}}function oo(t){let e;const n=new Oe({props:{href:"#/globalTransfersAPI",$$slots:{default:[no]},$$scope:{ctx:t}}});return{c(){nt(n.$$.fragment)},m(t,o){ot(n,t,o),e=!0},p(t,e){const o={};32&e[0]|128&e[1]&&(o.$$scope={dirty:e,ctx:t}),n.$set(o)},i(t){e||(W(n.$$.fragment,t),e=!0)},o(t){K(n.$$.fragment,t),e=!1},d(t){lt(n,t)}}}function lo(t){let e;const n=new ke({props:{$$slots:{default:[ro]},$$scope:{ctx:t}}});return{c(){nt(n.$$.fragment)},m(t,o){ot(n,t,o),e=!0},p(t,e){const o={};32&e[0]|128&e[1]&&(o.$$scope={dirty:e,ctx:t}),n.$set(o)},i(t){e||(W(n.$$.fragment,t),e=!0)},o(t){K(n.$$.fragment,t),e=!1},d(t){lt(n,t)}}}function so(t){let e,n=t[5]+1+"";return{c(){e=h(n)},m(t,n){$(t,e,n)},p(t,o){32&o[0]&&n!==(n=t[5]+1+"")&&_(e,n)},d(t){t&&p(e)}}}function ro(t){let e;const n=new Oe({props:{href:"#/globalTransfersAPI",$$slots:{default:[so]},$$scope:{ctx:t}}});return n.$on("click",t[27]),{c(){nt(n.$$.fragment)},m(t,o){ot(n,t,o),e=!0},p(t,e){const o={};32&e[0]|128&e[1]&&(o.$$scope={dirty:e,ctx:t}),n.$set(o)},i(t){e||(W(n.$$.fragment,t),e=!0)},o(t){K(n.$$.fragment,t),e=!1},d(t){lt(n,t)}}}function co(e){let n;const o=new Oe({props:{next:!0,href:"#/globalTransfersAPI"}});return o.$on("click",e[28]),{c(){nt(o.$$.fragment)},m(t,e){ot(o,t,e),n=!0},p:t,i(t){n||(W(o.$$.fragment,t),n=!0)},o(t){K(o.$$.fragment,t),n=!1},d(t){lt(o,t)}}}function ao(t){let e,n,o,l,s;const r=new ke({props:{class:1===t[5]?"disabled":"",$$slots:{default:[Kn]},$$scope:{ctx:t}}});let c=1!=t[5]&&Qn(t);const a=new ke({props:{active:!0,$$slots:{default:[oo]},$$scope:{ctx:t}}});let i=t[6]&&lo(t);const u=new ke({props:{class:t[6]?"":"disabled",$$slots:{default:[co]},$$scope:{ctx:t}}});return{c(){nt(r.$$.fragment),e=y(),c&&c.c(),n=y(),nt(a.$$.fragment),o=y(),i&&i.c(),l=y(),nt(u.$$.fragment)},m(t,d){ot(r,t,d),$(t,e,d),c&&c.m(t,d),$(t,n,d),ot(a,t,d),$(t,o,d),i&&i.m(t,d),$(t,l,d),ot(u,t,d),s=!0},p(t,e){const o={};32&e[0]&&(o.class=1===t[5]?"disabled":""),128&e[1]&&(o.$$scope={dirty:e,ctx:t}),r.$set(o),1!=t[5]?c?(c.p(t,e),32&e[0]&&W(c,1)):(c=Qn(t),c.c(),W(c,1),c.m(n.parentNode,n)):c&&(G(),K(c,1,1,()=>{c=null}),V());const s={};32&e[0]|128&e[1]&&(s.$$scope={dirty:e,ctx:t}),a.$set(s),t[6]?i?(i.p(t,e),64&e[0]&&W(i,1)):(i=lo(t),i.c(),W(i,1),i.m(l.parentNode,l)):i&&(G(),K(i,1,1,()=>{i=null}),V());const d={};64&e[0]&&(d.class=t[6]?"":"disabled"),128&e[1]&&(d.$$scope={dirty:e,ctx:t}),u.$set(d)},i(t){s||(W(r.$$.fragment,t),W(c),W(a.$$.fragment,t),W(i),W(u.$$.fragment,t),s=!0)},o(t){K(r.$$.fragment,t),K(c),K(a.$$.fragment,t),K(i),K(u.$$.fragment,t),s=!1},d(t){lt(r,t),t&&p(e),c&&c.d(t),t&&p(n),lt(a,t),t&&p(o),i&&i.d(t),t&&p(l),lt(u,t)}}}function io(t){let e,n;return{c(){e=g("i"),n=h(" Atrás"),x(e,"class","fas fa-arrow-circle-left")},m(t,o){$(t,e,o),$(t,n,o)},d(t){t&&p(e),t&&p(n)}}}function uo(t){let e,n;return{c(){e=g("i"),n=h(" Borrar todo"),x(e,"class","fa fa-trash"),x(e,"aria-hidden","true")},m(t,o){$(t,e,o),$(t,n,o)},d(t){t&&p(e),t&&p(n)}}}function fo(t){let e,n,o,l,s,r,c,a,i={ctx:t,current:null,token:null,pending:Wn,then:jn,catch:Pn,value:7,blocks:[,,,]};Q(l=t[7],i);const u=new be({props:{style:"float:right;",ariaLabel:"Cambiar de página",$$slots:{default:[ao]},$$scope:{ctx:t}}}),d=new Bt({props:{outline:!0,color:"secondary",$$slots:{default:[io]},$$scope:{ctx:t}}});d.$on("click",ht);const m=new Bt({props:{outline:!0,color:"danger",$$slots:{default:[uo]},$$scope:{ctx:t}}});return m.$on("click",t[11]),{c(){e=g("main"),n=g("div"),o=y(),i.block.c(),s=y(),nt(u.$$.fragment),r=y(),nt(d.$$.fragment),c=y(),nt(m.$$.fragment),x(n,"role","alert"),x(n,"id","div_alert"),T(n,"display","none")},m(t,l){$(t,e,l),f(e,n),f(e,o),i.block.m(e,i.anchor=null),i.mount=()=>e,i.anchor=s,f(e,s),ot(u,e,null),f(e,r),ot(d,e,null),f(e,c),ot(m,e,null),a=!0},p(e,n){if(t=e,i.ctx=t,128&n[0]&&l!==(l=t[7])&&Q(l,i));else{const e=t.slice();e[7]=i.resolved,i.block.p(e,n)}const o={};96&n[0]|128&n[1]&&(o.$$scope={dirty:n,ctx:t}),u.$set(o);const s={};128&n[1]&&(s.$$scope={dirty:n,ctx:t}),d.$set(s);const r={};128&n[1]&&(r.$$scope={dirty:n,ctx:t}),m.$set(r)},i(t){a||(W(i.block),W(u.$$.fragment,t),W(d.$$.fragment,t),W(m.$$.fragment,t),a=!0)},o(t){for(let t=0;t<3;t+=1){K(i.blocks[t])}K(u.$$.fragment,t),K(d.$$.fragment,t),K(m.$$.fragment,t),a=!1},d(t){t&&p(e),i.block.d(),i.token=null,i=null,lt(u),lt(d),lt(m)}}}function $o(){mo();var t=document.getElementById("div_alert");t.style="position: fixed; top: 0px; top: 2%; width: 90%;",t.className="alert alert-dismissible in alert-info ",t.innerHTML="<strong> Tabla Restaurada</strong> Se han cargado los datos iniciales",setTimeout(()=>{mo()},3e3)}function po(t){mo();var e=document.getElementById("div_alert");e.style="position: fixed; top: 0px; top: 2%; width: 90%;",e.className="alert alert-dismissible in alert-danger ",e.innerHTML="<strong> Error</strong> Ha ocurrido un error "+t,setTimeout(()=>{mo()},3e3)}function mo(){var t=document.getElementById("div_alert");t.style="display: none; ",t.className="alert alert-dismissible in",t.innerHTML=""}function go(t,e,n){let o=[],l={country:"",year:parseInt(""),team:"",signing:"",sale:"",balance:""},s=[],r=[],c="-",a="-",i=0,u=1,d=!0;async function f(){const t=await fetch("/api/v2/global-transfers");if(t.ok){const e=await t.json();n(1,s=e.map(t=>t.year)),n(1,s=Array.from(new Set(s))),n(2,r=e.map(t=>t.team)),n(2,r=Array.from(new Set(r))),console.log("Contados "+s.length+"años y "+r.length+"años distintos.")}else console.log("Error")}async function $(){console.log("Fetching transfers...");const t=await fetch("/api/v2/global-transfers?offset="+10*i+"&limit=10");if(t.ok){console.log("Ok:");const e=await t.json();if(n(7,o=e),console.log("Received "+o.length+" transfers."),10!=o.length)n(6,d=!1);else{const t=await fetch("/api/v2/global-transfers?offset="+10*(i+1)+"&limit=10");console.log("La variable NEXT tiene el estado: "+t.status),0==(await t.json()).length||404==t.status?n(6,d=!1):n(6,d=!0)}}else console.log("Error")}function p(t){i+=t,n(5,u+=t),$()}S($),S(f);return[l,s,r,c,a,u,d,o,async function(){const t=await fetch("/api/v2/global-transfers/loadInitialData");if(t.ok){const e=await t.json();console.log("Contados "+e.length+" datos de transferencias de fichajes"),$()}else console.log("No se han cargado correctamente los datos inicales")},async function(){if(console.log("Inserting transfer..."+JSON.stringify(l)),""==l.year||null==l.year||""==l.team||null==l.team)alert("Se debe incluir el año y el equipo vinculante obligatoriamente");else{await fetch("/api/v2/global-transfers",{method:"POST",body:JSON.stringify(l),headers:{"Content-Type":"application/json"}}).then((function(t){t.ok?($(),function(){mo();var t=document.getElementById("div_alert");t.style="position: fixed; top: 0px; top: 2%; width: 90%;",t.className="alert alert-dismissible in alert-success ",t.innerHTML="<strong> Dato insertado</strong> Se ha insertado el dato correctamente",setTimeout(()=>{mo()},3e3)}(),n(0,l.country="",l),n(0,l.year="",l),n(0,l.team="",l),n(0,l.signing="",l),n(0,l.sale="",l),n(0,l.balance="",l)):po("Error interno al intentar insertar el elemento")}))}},async function(t,e){console.log("Deleting transfer..."+JSON.stringify(t)+ +JSON.stringify(e)),await fetch("/api/v2/global-transfers/"+t+"/"+e,{method:"DELETE"}).then((function(t){t.ok?($(),f(),function(){mo();var t=document.getElementById("div_alert");t.style="position: fixed; top: 0px; top: 2%; width: 90%;",t.className="alert alert-dismissible in alert-danger ",t.innerHTML="<strong> Dato borrado</strong> Se ha borrado el dato correctamente",setTimeout(()=>{mo()},3e3)}()):404==t.status?po("El elemento que intentas borrar no existe"):po("Error al intentar borrar un elemento")}))},async function(){console.log("Deleting all transfers data..."),await fetch("/api/v2/global-transfers/",{method:"DELETE"}).then((function(t){t.ok?($(),f(),function(){mo();var t=document.getElementById("div_alert");t.style="position: fixed; top: 0px; top: 2%; width: 90%;",t.className="alert alert-dismissible in alert-danger ",t.innerHTML="<strong> Datos borrados</strong> Se han borrado todos los datos correctamente",setTimeout(()=>{mo()},3e3)}()):po("Error al borrar todos los elementos")}))},async function(t,e){console.log("Searching data: "+t+" and "+e);var l="/api/v2/global-transfers";"-"!=t&&"-"!=e?l=l+"?year="+t+"&team="+e:"-"!=t&&"-"==e?l=l+"?year="+t:"-"==t&&"-"!=e&&(l=l+"?team="+e);const s=await fetch(l);if(s.ok){console.log("Ok:");const t=await s.json();n(7,o=t),console.log("Found "+o.length+" global transfers stats.")}else console.log("Error")},p,i,f,$,function(t){c=t,n(3,c)},function(t){a=t,n(4,a)},function(){l.country=this.value,n(0,l)},function(){l.year=w(this.value),n(0,l)},function(){l.team=this.value,n(0,l)},function(){l.signing=w(this.value),n(0,l)},function(){l.sale=w(this.value),n(0,l)},function(){l.balance=w(this.value),n(0,l)},()=>p(-1),()=>p(-1),()=>p(1),()=>p(1)]}class ho extends ct{constructor(t){super(),rt(this,t,go,fo,r,{},[-1,-1])}}function yo(e){let n,o,l,s;const r=new ho({});return{c(){n=g("main"),o=g("h1"),o.textContent="Administrador de datos de transferencias",l=y(),nt(r.$$.fragment),x(o,"class","display-4"),T(o,"text-align","center")},m(t,e){$(t,n,e),f(n,o),f(n,l),ot(r,n,null),s=!0},p:t,i(t){s||(W(r.$$.fragment,t),s=!0)},o(t){K(r.$$.fragment,t),s=!1},d(t){t&&p(n),lt(r)}}}class bo extends ct{constructor(t){super(),rt(this,t,null,yo,r,{})}}function vo(e){return{c:t,m:t,p:t,i:t,o:t,d:t}}function xo(t){let e;const n=new At({props:{bordered:!0,$$slots:{default:[wo]},$$scope:{ctx:t}}});return{c(){nt(n.$$.fragment)},m(t,o){ot(n,t,o),e=!0},p(t,e){const o={};32894&e&&(o.$$scope={dirty:e,ctx:t}),n.$set(o)},i(t){e||(W(n.$$.fragment,t),e=!0)},o(t){K(n.$$.fragment,t),e=!1},d(t){lt(n,t)}}}function ko(t){let e,n;return{c(){e=g("i"),n=h(" Actualizar"),x(e,"class","fa fa-refresh"),x(e,"aria-hidden","true")},m(t,o){$(t,e,o),$(t,n,o)},d(t){t&&p(e),t&&p(n)}}}function wo(t){let e,n,o,s,r,c,a,i,u,d,m,b,k,T,O,N,I,A,L,S,C,P,j,M,H;const R=new Bt({props:{outline:!0,color:"primary",$$slots:{default:[ko]},$$scope:{ctx:t}}});return R.$on("click",t[9]),{c(){e=g("thead"),e.innerHTML="<tr><th>Pais</th> \n                    <th>Año</th> \n                    <th>Equipo</th> \n                    <th>Fichajes</th> \n                    <th>Ventas</th> \n                    <th>Balance Final</th> \n                    <th>Acciones</th></tr>",n=y(),o=g("tbody"),s=g("tr"),r=g("td"),c=g("input"),a=y(),i=g("td"),u=h(t[2]),d=y(),m=g("td"),b=h(t[3]),k=y(),T=g("td"),O=g("input"),N=y(),I=g("td"),A=g("input"),L=y(),S=g("td"),C=g("input"),P=y(),j=g("td"),nt(R.$$.fragment),x(O,"type","number"),x(A,"type","number"),x(C,"type","number")},m(p,g,h){$(p,e,g),$(p,n,g),$(p,o,g),f(o,s),f(s,r),f(r,c),E(c,t[1]),f(s,a),f(s,i),f(i,u),f(s,d),f(s,m),f(m,b),f(s,k),f(s,T),f(T,O),E(O,t[4]),f(s,N),f(s,I),f(I,A),E(A,t[5]),f(s,L),f(s,S),f(S,C),E(C,t[6]),f(s,P),f(s,j),ot(R,j,null),M=!0,h&&l(H),H=[v(c,"input",t[11]),v(O,"input",t[12]),v(A,"input",t[13]),v(C,"input",t[14])]},p(t,e){2&e&&c.value!==t[1]&&E(c,t[1]),(!M||4&e)&&_(u,t[2]),(!M||8&e)&&_(b,t[3]),16&e&&w(O.value)!==t[4]&&E(O,t[4]),32&e&&w(A.value)!==t[5]&&E(A,t[5]),64&e&&w(C.value)!==t[6]&&E(C,t[6]);const n={};32768&e&&(n.$$scope={dirty:e,ctx:t}),R.$set(n)},i(t){M||(W(R.$$.fragment,t),M=!0)},o(t){K(R.$$.fragment,t),M=!1},d(t){t&&p(e),t&&p(n),t&&p(o),lt(R),l(H)}}}function _o(e){let n;return{c(){n=h("Cargando transfers...")},m(t,e){$(t,n,e)},p:t,i:t,o:t,d(t){t&&p(n)}}}function Eo(t){let e,n,o;return{c(){e=g("p"),n=h("ERROR: "),o=h(t[7]),T(e,"color","red")},m(t,l){$(t,e,l),f(e,n),f(e,o)},p(t,e){128&e&&_(o,t[7])},d(t){t&&p(e)}}}function To(t){let e,n;return{c(){e=g("i"),n=h(" Atrás"),x(e,"class","fas fa-arrow-circle-left")},m(t,o){$(t,e,o),$(t,n,o)},d(t){t&&p(e),t&&p(n)}}}function Oo(t){let e,n,o,l,s,r,c,a,i,u,d,m,b,v,k=t[0].team+"",w=t[0].year+"",E={ctx:t,current:null,token:null,pending:_o,then:xo,catch:vo,value:8,blocks:[,,,]};Q(d=t[8],E);let O=t[7]&&Eo(t);const N=new Bt({props:{outline:!0,color:"secondary",$$slots:{default:[To]},$$scope:{ctx:t}}});return N.$on("click",ht),{c(){e=g("main"),n=g("div"),o=y(),l=g("h3"),s=h("Editar Transfer "),r=g("strong"),c=h(k),a=h(" : "),i=h(w),u=y(),E.block.c(),m=y(),O&&O.c(),b=y(),nt(N.$$.fragment),x(n,"role","alert"),x(n,"id","div_alert"),T(n,"display","none")},m(t,d){$(t,e,d),f(e,n),f(e,o),f(e,l),f(l,s),f(l,r),f(r,c),f(r,a),f(r,i),f(e,u),E.block.m(e,E.anchor=null),E.mount=()=>e,E.anchor=m,f(e,m),O&&O.m(e,null),f(e,b),ot(N,e,null),v=!0},p(n,[o]){if(t=n,(!v||1&o)&&k!==(k=t[0].team+"")&&_(c,k),(!v||1&o)&&w!==(w=t[0].year+"")&&_(i,w),E.ctx=t,256&o&&d!==(d=t[8])&&Q(d,E));else{const e=t.slice();e[8]=E.resolved,E.block.p(e,o)}t[7]?O?O.p(t,o):(O=Eo(t),O.c(),O.m(e,b)):O&&(O.d(1),O=null);const l={};32768&o&&(l.$$scope={dirty:o,ctx:t}),N.$set(l)},i(t){v||(W(E.block),W(N.$$.fragment,t),v=!0)},o(t){for(let t=0;t<3;t+=1){K(E.blocks[t])}K(N.$$.fragment,t),v=!1},d(t){t&&p(e),E.block.d(),E.token=null,E=null,O&&O.d(),lt(N)}}}function No(t){Io();var e=document.getElementById("div_alert");e.style="position: fixed; top: 0px; top: 2%; width: 90%;",e.className="alert alert-dismissible in alert-danger ",e.innerHTML="<strong>Error</strong> Ha ocurrido un error "+t,setTimeout(()=>{Io()},3e3)}function Io(){var t=document.getElementById("div_alert");t.style="display: none; ",t.className="alert alert-dismissible in",t.innerHTML=""}function Ao(t,e,n){let{params:o={}}=e,l={},s="XXXX",r=12345,c="SevillaFC",a=17,i=32,u=108.2,d="";async function f(){console.log("Fetching transfer...");const t=await fetch("/api/v2/global-transfers/"+o.year+"/"+o.team);if(t.ok){console.log("Ok:");const e=await t.json();n(8,l=e),n(1,s=l.country),n(2,r=l.year),n(3,c=l.team),n(4,a=l.signing),n(5,i=l.sale),n(6,u=l.balance),console.log("Received transfer")}else n(7,d=t.status+": "+t.statusText),console.log("Error"+d)}return S(f),t.$set=t=>{"params"in t&&n(0,o=t.params)},[o,s,r,c,a,i,u,d,l,async function(){console.log("Updating transfer..."+JSON.stringify(o.year)),await fetch("/api/v2/global-transfers/"+o.year+"/"+o.team,{method:"PUT",body:JSON.stringify({country:s,year:parseInt(o.year),team:o.team,signing:a,sale:i,balance:u}),headers:{"Content-Type":"application/json"}}).then((function(t){t.ok?(f(),function(){Io();var t=document.getElementById("div_alert");t.style="position: fixed; top: 0px; top: 2%; width: 90%;",t.className="alert alert-dismissible in alert-info ",t.innerHTML="<strong>Dato actualizado</strong> Se ha actualizado el dato correctamente",setTimeout(()=>{Io()},3e3)}()):404==t.status?No("Se ha intentado borrar un elemento inexistente."):No("")}))},f,function(){s=this.value,n(1,s)},function(){a=w(this.value),n(4,a)},function(){i=w(this.value),n(5,i)},function(){u=w(this.value),n(6,u)}]}class Lo extends ct{constructor(t){super(),rt(this,t,Ao,Oo,r,{params:0})}}function So(t,e,n){const o=t.slice();return o[27]=e[n],o}function Co(t,e,n){const o=t.slice();return o[30]=e[n],o}function Po(e){return{c:t,m:t,p:t,i:t,o:t,d:t}}function jo(t){let e,n,o;const l=new ge({props:{$$slots:{default:[zo]},$$scope:{ctx:t}}}),s=new Bt({props:{outline:!0,color:"primary",$$slots:{default:[Bo]},$$scope:{ctx:t}}});s.$on("click",t[6]);const r=new At({props:{bordered:!0,$$slots:{default:[Xo]},$$scope:{ctx:t}}});return{c(){nt(l.$$.fragment),e=y(),nt(s.$$.fragment),n=y(),nt(r.$$.fragment)},m(t,c){ot(l,t,c),$(t,e,c),ot(s,t,c),$(t,n,c),ot(r,t,c),o=!0},p(t,e){const n={};6&e[0]|4&e[1]&&(n.$$scope={dirty:e,ctx:t}),l.$set(n);const o={};4&e[1]&&(o.$$scope={dirty:e,ctx:t}),s.$set(o);const c={};33&e[0]|4&e[1]&&(c.$$scope={dirty:e,ctx:t}),r.$set(c)},i(t){o||(W(l.$$.fragment,t),W(s.$$.fragment,t),W(r.$$.fragment,t),o=!0)},o(t){K(l.$$.fragment,t),K(s.$$.fragment,t),K(r.$$.fragment,t),o=!1},d(t){lt(l,t),t&&p(e),lt(s,t),t&&p(n),lt(r,t)}}}function Mo(t){let e;return{c(){e=h("Jugador que desea buscar")},m(t,n){$(t,e,n)},d(t){t&&p(e)}}}function Ho(t){let e,n,o,l=t[30]+"";return{c(){e=g("option"),n=h(l),e.__value=o=t[30],e.value=e.__value},m(t,o){$(t,e,o),f(e,n)},p(t,s){2&s[0]&&l!==(l=t[30]+"")&&_(n,l),2&s[0]&&o!==(o=t[30])&&(e.__value=o),e.value=e.__value},d(t){t&&p(e)}}}function Ro(t){let e,n,o=t[1],l=[];for(let e=0;e<o.length;e+=1)l[e]=Ho(Co(t,o,e));return{c(){for(let t=0;t<l.length;t+=1)l[t].c();e=y(),n=g("option"),n.textContent="--Mostrar todos--",n.__value="--Mostrar todos--",n.value=n.__value},m(t,o){for(let e=0;e<l.length;e+=1)l[e].m(t,o);$(t,e,o),$(t,n,o)},p(t,n){if(2&n[0]){let s;for(o=t[1],s=0;s<o.length;s+=1){const r=Co(t,o,s);l[s]?l[s].p(r,n):(l[s]=Ho(r),l[s].c(),l[s].m(e.parentNode,e))}for(;s<l.length;s+=1)l[s].d(1);l.length=o.length}},d(t){m(l,t),t&&p(e),t&&p(n)}}}function zo(t){let e,n,o;const l=new de({props:{for:"selectName",$$slots:{default:[Mo]},$$scope:{ctx:t}}});function s(e){t[16].call(null,e)}let r={type:"select",name:"selectName",onchange:t[10](t[2]),id:"selectName",$$slots:{default:[Ro]},$$scope:{ctx:t}};void 0!==t[2]&&(r.value=t[2]);const c=new ae({props:r});return M.push(()=>et(c,"value",s)),{c(){nt(l.$$.fragment),e=y(),nt(c.$$.fragment)},m(t,n){ot(l,t,n),$(t,e,n),ot(c,t,n),o=!0},p(t,e){const o={};4&e[1]&&(o.$$scope={dirty:e,ctx:t}),l.$set(o);const s={};4&e[0]&&(s.onchange=t[10](t[2])),2&e[0]|4&e[1]&&(s.$$scope={dirty:e,ctx:t}),!n&&4&e[0]&&(n=!0,s.value=t[2],q(()=>n=!1)),c.$set(s)},i(t){o||(W(l.$$.fragment,t),W(c.$$.fragment,t),o=!0)},o(t){K(l.$$.fragment,t),K(c.$$.fragment,t),o=!1},d(t){lt(l,t),t&&p(e),lt(c,t)}}}function Bo(t){let e,n;return{c(){e=g("i"),n=h(" Cargar datos iniciales"),x(e,"class","fa fa-refresh")},m(t,o){$(t,e,o),$(t,n,o)},d(t){t&&p(e),t&&p(n)}}}function Do(t){let e;return{c(){e=h("Insertar")},m(t,n){$(t,e,n)},d(t){t&&p(e)}}}function qo(t){let e,n;return{c(){e=g("i"),n=h(" Eliminar"),x(e,"class","fa fa-trash"),x(e,"aria-hidden","true")},m(t,o){$(t,e,o),$(t,n,o)},d(t){t&&p(e),t&&p(n)}}}function Fo(t){let e,n;return{c(){e=g("i"),n=h(" Editar"),x(e,"class","fa fa-edit"),x(e,"aria-hidden","true")},m(t,o){$(t,e,o),$(t,n,o)},d(t){t&&p(e),t&&p(n)}}}function Jo(t){let e,n,o,l,r,c,a,i,u,d,m,b,v,x,k,w,E,T,O,N,I,A,L,S,C=t[27].name+"",P=t[27].country+"",j=t[27].debut+"",M=t[27].goals+"",H=t[27].matches+"",R=t[27].teams+"";const z=new Bt({props:{outline:!0,color:"danger",$$slots:{default:[qo]},$$scope:{ctx:t}}});z.$on("click",(function(){s(t[8](t[27].name))&&t[8](t[27].name).apply(this,arguments)}));const B=new Bt({props:{outline:!0,color:"info",href:"#/goalscorers/"+t[27].name,$$slots:{default:[Fo]},$$scope:{ctx:t}}});return{c(){e=g("tr"),n=g("td"),o=h(C),l=y(),r=g("td"),c=h(P),a=y(),i=g("td"),u=h(j),d=y(),m=g("td"),b=h(M),v=y(),x=g("td"),k=h(H),w=y(),E=g("td"),T=h(R),O=y(),N=g("td"),nt(z.$$.fragment),I=y(),A=g("td"),nt(B.$$.fragment),L=y()},m(t,s){$(t,e,s),f(e,n),f(n,o),f(e,l),f(e,r),f(r,c),f(e,a),f(e,i),f(i,u),f(e,d),f(e,m),f(m,b),f(e,v),f(e,x),f(x,k),f(e,w),f(e,E),f(E,T),f(e,O),f(e,N),ot(z,N,null),f(e,I),f(e,A),ot(B,A,null),f(e,L),S=!0},p(e,n){t=e,(!S||32&n[0])&&C!==(C=t[27].name+"")&&_(o,C),(!S||32&n[0])&&P!==(P=t[27].country+"")&&_(c,P),(!S||32&n[0])&&j!==(j=t[27].debut+"")&&_(u,j),(!S||32&n[0])&&M!==(M=t[27].goals+"")&&_(b,M),(!S||32&n[0])&&H!==(H=t[27].matches+"")&&_(k,H),(!S||32&n[0])&&R!==(R=t[27].teams+"")&&_(T,R);const l={};4&n[1]&&(l.$$scope={dirty:n,ctx:t}),z.$set(l);const s={};32&n[0]&&(s.href="#/goalscorers/"+t[27].name),4&n[1]&&(s.$$scope={dirty:n,ctx:t}),B.$set(s)},i(t){S||(W(z.$$.fragment,t),W(B.$$.fragment,t),S=!0)},o(t){K(z.$$.fragment,t),K(B.$$.fragment,t),S=!1},d(t){t&&p(e),lt(z),lt(B)}}}function Xo(t){let e,n,o,s,r,c,a,i,u,d,h,b,k,_,T,O,N,I,A,L,S,C,P,j,M,H;const R=new Bt({props:{outline:!0,color:"primary",$$slots:{default:[Do]},$$scope:{ctx:t}}});R.$on("click",t[7]);let z=t[5],B=[];for(let e=0;e<z.length;e+=1)B[e]=Jo(So(t,z,e));const D=t=>K(B[t],1,1,()=>{B[t]=null});return{c(){e=g("thead"),e.innerHTML="<tr><th>Nombre</th> \n\t\t\t\t\t<th>País</th> \n\t\t\t\t\t<th>Debut</th> \n\t\t\t\t\t<th>Goles</th> \n\t\t\t\t\t<th>Partidos</th> \n\t\t\t\t\t<th>Equipos</th> \n\t\t\t\t\t<th>Acciones</th></tr>",n=y(),o=g("tbody"),s=g("tr"),r=g("td"),c=g("input"),a=y(),i=g("td"),u=g("input"),d=y(),h=g("td"),b=g("input"),k=y(),_=g("td"),T=g("input"),O=y(),N=g("td"),I=g("input"),A=y(),L=g("td"),S=g("input"),C=y(),P=g("td"),nt(R.$$.fragment),j=y();for(let t=0;t<B.length;t+=1)B[t].c();x(b,"type","number"),x(T,"type","number"),x(I,"type","number"),x(S,"type","number")},m(p,m,g){$(p,e,m),$(p,n,m),$(p,o,m),f(o,s),f(s,r),f(r,c),E(c,t[0].name),f(s,a),f(s,i),f(i,u),E(u,t[0].country),f(s,d),f(s,h),f(h,b),E(b,t[0].debut),f(s,k),f(s,_),f(_,T),E(T,t[0].goals),f(s,O),f(s,N),f(N,I),E(I,t[0].matches),f(s,A),f(s,L),f(L,S),E(S,t[0].teams),f(s,C),f(s,P),ot(R,P,null),f(o,j);for(let t=0;t<B.length;t+=1)B[t].m(o,null);M=!0,g&&l(H),H=[v(c,"input",t[17]),v(u,"input",t[18]),v(b,"input",t[19]),v(T,"input",t[20]),v(I,"input",t[21]),v(S,"input",t[22])]},p(t,e){1&e[0]&&c.value!==t[0].name&&E(c,t[0].name),1&e[0]&&u.value!==t[0].country&&E(u,t[0].country),1&e[0]&&w(b.value)!==t[0].debut&&E(b,t[0].debut),1&e[0]&&w(T.value)!==t[0].goals&&E(T,t[0].goals),1&e[0]&&w(I.value)!==t[0].matches&&E(I,t[0].matches),1&e[0]&&w(S.value)!==t[0].teams&&E(S,t[0].teams);const n={};if(4&e[1]&&(n.$$scope={dirty:e,ctx:t}),R.$set(n),288&e[0]){let n;for(z=t[5],n=0;n<z.length;n+=1){const l=So(t,z,n);B[n]?(B[n].p(l,e),W(B[n],1)):(B[n]=Jo(l),B[n].c(),W(B[n],1),B[n].m(o,null))}for(G(),n=z.length;n<B.length;n+=1)D(n);V()}},i(t){if(!M){W(R.$$.fragment,t);for(let t=0;t<z.length;t+=1)W(B[t]);M=!0}},o(t){K(R.$$.fragment,t),B=B.filter(Boolean);for(let t=0;t<B.length;t+=1)K(B[t]);M=!1},d(t){t&&p(e),t&&p(n),t&&p(o),lt(R),m(B,t),l(H)}}}function Uo(e){let n;return{c(){n=h("Loading goalscorers...")},m(t,e){$(t,n,e)},p:t,i:t,o:t,d(t){t&&p(n)}}}function Yo(e){let n;const o=new Oe({props:{previous:!0,href:"#/goalscorersAPI"}});return o.$on("click",e[23]),{c(){nt(o.$$.fragment)},m(t,e){ot(o,t,e),n=!0},p:t,i(t){n||(W(o.$$.fragment,t),n=!0)},o(t){K(o.$$.fragment,t),n=!1},d(t){lt(o,t)}}}function Zo(t){let e;const n=new ke({props:{$$slots:{default:[Vo]},$$scope:{ctx:t}}});return{c(){nt(n.$$.fragment)},m(t,o){ot(n,t,o),e=!0},p(t,e){const o={};8&e[0]|4&e[1]&&(o.$$scope={dirty:e,ctx:t}),n.$set(o)},i(t){e||(W(n.$$.fragment,t),e=!0)},o(t){K(n.$$.fragment,t),e=!1},d(t){lt(n,t)}}}function Go(t){let e,n=t[3]-1+"";return{c(){e=h(n)},m(t,n){$(t,e,n)},p(t,o){8&o[0]&&n!==(n=t[3]-1+"")&&_(e,n)},d(t){t&&p(e)}}}function Vo(t){let e;const n=new Oe({props:{href:"#/goalscorersAPI",$$slots:{default:[Go]},$$scope:{ctx:t}}});return n.$on("click",t[24]),{c(){nt(n.$$.fragment)},m(t,o){ot(n,t,o),e=!0},p(t,e){const o={};8&e[0]|4&e[1]&&(o.$$scope={dirty:e,ctx:t}),n.$set(o)},i(t){e||(W(n.$$.fragment,t),e=!0)},o(t){K(n.$$.fragment,t),e=!1},d(t){lt(n,t)}}}function Wo(t){let e;return{c(){e=h(t[3])},m(t,n){$(t,e,n)},p(t,n){8&n[0]&&_(e,t[3])},d(t){t&&p(e)}}}function Ko(t){let e;const n=new Oe({props:{href:"#/goalscorersAPI",$$slots:{default:[Wo]},$$scope:{ctx:t}}});return{c(){nt(n.$$.fragment)},m(t,o){ot(n,t,o),e=!0},p(t,e){const o={};8&e[0]|4&e[1]&&(o.$$scope={dirty:e,ctx:t}),n.$set(o)},i(t){e||(W(n.$$.fragment,t),e=!0)},o(t){K(n.$$.fragment,t),e=!1},d(t){lt(n,t)}}}function Qo(t){let e;const n=new ke({props:{$$slots:{default:[el]},$$scope:{ctx:t}}});return{c(){nt(n.$$.fragment)},m(t,o){ot(n,t,o),e=!0},p(t,e){const o={};8&e[0]|4&e[1]&&(o.$$scope={dirty:e,ctx:t}),n.$set(o)},i(t){e||(W(n.$$.fragment,t),e=!0)},o(t){K(n.$$.fragment,t),e=!1},d(t){lt(n,t)}}}function tl(t){let e,n=t[3]+1+"";return{c(){e=h(n)},m(t,n){$(t,e,n)},p(t,o){8&o[0]&&n!==(n=t[3]+1+"")&&_(e,n)},d(t){t&&p(e)}}}function el(t){let e;const n=new Oe({props:{href:"#/goalscorersAPI",$$slots:{default:[tl]},$$scope:{ctx:t}}});return n.$on("click",t[25]),{c(){nt(n.$$.fragment)},m(t,o){ot(n,t,o),e=!0},p(t,e){const o={};8&e[0]|4&e[1]&&(o.$$scope={dirty:e,ctx:t}),n.$set(o)},i(t){e||(W(n.$$.fragment,t),e=!0)},o(t){K(n.$$.fragment,t),e=!1},d(t){lt(n,t)}}}function nl(e){let n;const o=new Oe({props:{next:!0,href:"#/goalscorersAPI"}});return o.$on("click",e[26]),{c(){nt(o.$$.fragment)},m(t,e){ot(o,t,e),n=!0},p:t,i(t){n||(W(o.$$.fragment,t),n=!0)},o(t){K(o.$$.fragment,t),n=!1},d(t){lt(o,t)}}}function ol(t){let e,n,o,l,s;const r=new ke({props:{class:1===t[3]?"disabled":"",$$slots:{default:[Yo]},$$scope:{ctx:t}}});let c=1!=t[3]&&Zo(t);const a=new ke({props:{active:!0,$$slots:{default:[Ko]},$$scope:{ctx:t}}});let i=t[4]&&Qo(t);const u=new ke({props:{class:t[4]?"":"disabled",$$slots:{default:[nl]},$$scope:{ctx:t}}});return{c(){nt(r.$$.fragment),e=y(),c&&c.c(),n=y(),nt(a.$$.fragment),o=y(),i&&i.c(),l=y(),nt(u.$$.fragment)},m(t,d){ot(r,t,d),$(t,e,d),c&&c.m(t,d),$(t,n,d),ot(a,t,d),$(t,o,d),i&&i.m(t,d),$(t,l,d),ot(u,t,d),s=!0},p(t,e){const o={};8&e[0]&&(o.class=1===t[3]?"disabled":""),4&e[1]&&(o.$$scope={dirty:e,ctx:t}),r.$set(o),1!=t[3]?c?(c.p(t,e),8&e[0]&&W(c,1)):(c=Zo(t),c.c(),W(c,1),c.m(n.parentNode,n)):c&&(G(),K(c,1,1,()=>{c=null}),V());const s={};8&e[0]|4&e[1]&&(s.$$scope={dirty:e,ctx:t}),a.$set(s),t[4]?i?(i.p(t,e),16&e[0]&&W(i,1)):(i=Qo(t),i.c(),W(i,1),i.m(l.parentNode,l)):i&&(G(),K(i,1,1,()=>{i=null}),V());const d={};16&e[0]&&(d.class=t[4]?"":"disabled"),4&e[1]&&(d.$$scope={dirty:e,ctx:t}),u.$set(d)},i(t){s||(W(r.$$.fragment,t),W(c),W(a.$$.fragment,t),W(i),W(u.$$.fragment,t),s=!0)},o(t){K(r.$$.fragment,t),K(c),K(a.$$.fragment,t),K(i),K(u.$$.fragment,t),s=!1},d(t){lt(r,t),t&&p(e),c&&c.d(t),t&&p(n),lt(a,t),t&&p(o),i&&i.d(t),t&&p(l),lt(u,t)}}}function ll(t){let e,n;return{c(){e=g("i"),n=h(" Atrás"),x(e,"class","fas fa-arrow-circle-left")},m(t,o){$(t,e,o),$(t,n,o)},d(t){t&&p(e),t&&p(n)}}}function sl(t){let e,n;return{c(){e=g("i"),n=h(" Borrar todo"),x(e,"class","fa fa-trash"),x(e,"aria-hidden","true")},m(t,o){$(t,e,o),$(t,n,o)},d(t){t&&p(e),t&&p(n)}}}function rl(t){let e,n,o,l,s,r,c,a,i={ctx:t,current:null,token:null,pending:Uo,then:jo,catch:Po,value:5,blocks:[,,,]};Q(l=t[5],i);const u=new be({props:{style:"float:right;",ariaLabel:"Cambiar de página",$$slots:{default:[ol]},$$scope:{ctx:t}}}),d=new Bt({props:{outline:!0,color:"secondary",$$slots:{default:[ll]},$$scope:{ctx:t}}});d.$on("click",ht);const m=new Bt({props:{outline:!0,color:"danger",$$slots:{default:[sl]},$$scope:{ctx:t}}});return m.$on("click",t[9]),{c(){e=g("main"),n=g("div"),o=y(),i.block.c(),s=y(),nt(u.$$.fragment),r=y(),nt(d.$$.fragment),c=y(),nt(m.$$.fragment),x(n,"role","alert"),x(n,"id","div_alert"),T(n,"display","none")},m(t,l){$(t,e,l),f(e,n),f(e,o),i.block.m(e,i.anchor=null),i.mount=()=>e,i.anchor=s,f(e,s),ot(u,e,null),f(e,r),ot(d,e,null),f(e,c),ot(m,e,null),a=!0},p(e,n){if(t=e,i.ctx=t,32&n[0]&&l!==(l=t[5])&&Q(l,i));else{const e=t.slice();e[5]=i.resolved,i.block.p(e,n)}const o={};24&n[0]|4&n[1]&&(o.$$scope={dirty:n,ctx:t}),u.$set(o);const s={};4&n[1]&&(s.$$scope={dirty:n,ctx:t}),d.$set(s);const r={};4&n[1]&&(r.$$scope={dirty:n,ctx:t}),m.$set(r)},i(t){a||(W(i.block),W(u.$$.fragment,t),W(d.$$.fragment,t),W(m.$$.fragment,t),a=!0)},o(t){for(let t=0;t<3;t+=1){K(i.blocks[t])}K(u.$$.fragment,t),K(d.$$.fragment,t),K(m.$$.fragment,t),a=!1},d(t){t&&p(e),i.block.d(),i.token=null,i=null,lt(u),lt(d),lt(m)}}}function cl(t){al();var e=document.getElementById("div_alert");e.style="position: fixed; top: 0px; top: 2%; width: 90%;",e.className="alert alert-dismissible in alert-danger ",e.innerHTML="<strong> Error.</strong> Ha ocurrido un error "+t,setTimeout(()=>{al()},3e3)}function al(){var t=document.getElementById("div_alert");t.style="display: none; ",t.className="alert alert-dismissible in",t.innerHTML=""}function il(t,e,n){let o=[],l={name:"",country:"",debut:parseInt(""),goals:"",matches:"",teams:""},s=[],r="--Mostrar todos--",c=0,a=1,i=!0;async function u(){const t=await fetch("/api/v2/goalscorers");if(t.ok){const e=await t.json();n(1,s=e.map(t=>t.name)),console.log("Contados "+s.length+" goles.")}else console.log("Error")}async function d(){console.log("Fetching goalscorers...");const t=await fetch("/api/v2/goalscorers?offset="+10*c+"&limit=10");if(t.ok){console.log("Ok:");const e=await t.json();if(n(5,o=e),console.log("Received "+o.length+" goalscorers."),10!=o.length)n(4,i=!1);else{const t=await fetch("/api/v2/goalscorers?offset="+10*(c+1)+"&limit=10");console.log("La variable NEXT tiene el estado: "+t.status),0==(await t.json()).length||404==t.status?n(4,i=!1):n(4,i=!0)}}else console.log("ERROR!")}function f(t){c+=t,n(3,a+=t),d()}S(d),S(u);return[l,s,r,a,i,o,async function(){const t=await fetch("/api/v2/goalscorers/loadInitialData");if(t.ok){const e=await t.json();console.log("Contados "+e.length+" datos de goleadores."),function(){al();var t=document.getElementById("div_alert");t.style="position: fixed; top: 0px; top: 2%; width: 90%;",t.className="alert alert-dismissible in alert-info ",t.innerHTML="<strong> Tabla Restaurada.</strong> Se han restaurado los datos",setTimeout(()=>{al()},3e3)}(),d()}else console.log("No se han cargado correctamente los datos iniciales")},async function(){if(console.log("Inserting goalscorer..."+JSON.stringify(l)),""==l.debut||null==l.debut||""==l.name||null==l.name||null==l.goals||""==l.goals)alert("Se debe incluir el nombre, el año de debut y los goles del goleador obligatoriamente");else{await fetch("/api/v2/goalscorers",{method:"POST",body:JSON.stringify(l),headers:{"Content-Type":"application/json"}}).then((function(t){t.ok?(d(),function(){al();var t=document.getElementById("div_alert");t.style="position: fixed; top: 0px; top: 2%; width: 90%;",t.className="alert alert-dismissible in alert-success ",t.innerHTML="<strong> Dato insertado.</strong> Se ha insertado el dato correctamente",setTimeout(()=>{al()},3e3)}(),n(0,l.country="",l),n(0,l.debut="",l),n(0,l.goals="",l),n(0,l.matches="",l),n(0,l.name="",l),n(0,l.teams="",l)):cl("Error interno al intentar insertar un goleador")}))}},async function(t){console.log("Deleting goalscorer..."+JSON.stringify(t)),await fetch("/api/v2/goalscorers/"+t,{method:"DELETE"}).then((function(t){t.ok?(d(),function(){al();var t=document.getElementById("div_alert");t.style="position: fixed; top: 0px; top: 2%; width: 90%;",t.className="alert alert-dismissible in alert-danger ",t.innerHTML="<strong> Dato borrado.</strong> Se ha borrado el dato correctamente",setTimeout(()=>{al()},3e3)}()):404==t.status?cl("El elemento que intentas borrar no existe"):cl("Error al intentar borrar un elemento")}))},async function(){console.log("Deleting all goalscorers data..."),await fetch("/api/v2/goalscorers/",{method:"DELETE"}).then((function(t){t.ok?(d(),function(){al();var t=document.getElementById("div_alert");t.style="position: fixed; top: 0px; top: 2%; width: 90%;",t.className="alert alert-dismissible in alert-danger ",t.innerHTML="<strong> Datos borrados.</strong> Se han borrado todos los datos correctamente",setTimeout(()=>{al()},3e3)}()):cl("Error al borrar todos los elementos")}))},async function(t){console.log("Searching data: "+t);var e="/api/v2/goalscorers";"--Mostrar todos--"!=t&&(e=e+"?name="+t);const l=await fetch(e);if(l.ok){console.log("Ok:");const t=await l.json();n(5,o=t),console.log("Found "+o.length+" goalscorers stats.")}else console.log("ERROR!")},f,c,[],u,d,function(t){r=t,n(2,r)},function(){l.name=this.value,n(0,l)},function(){l.country=this.value,n(0,l)},function(){l.debut=w(this.value),n(0,l)},function(){l.goals=w(this.value),n(0,l)},function(){l.matches=w(this.value),n(0,l)},function(){l.teams=w(this.value),n(0,l)},()=>f(-1),()=>f(-1),()=>f(1),()=>f(1)]}class ul extends ct{constructor(t){super(),rt(this,t,il,rl,r,{},[-1,-1])}}function dl(e){let n,o,l,s;const r=new ul({});return{c(){n=g("main"),o=g("h1"),o.textContent="Administrador de datos de goleadores",l=y(),nt(r.$$.fragment),x(o,"class","display-4"),T(o,"text-align","center")},m(t,e){$(t,n,e),f(n,o),f(n,l),ot(r,n,null),s=!0},p:t,i(t){s||(W(r.$$.fragment,t),s=!0)},o(t){K(r.$$.fragment,t),s=!1},d(t){t&&p(n),lt(r)}}}class fl extends ct{constructor(t){super(),rt(this,t,null,dl,r,{})}}function $l(e){return{c:t,m:t,p:t,i:t,o:t,d:t}}function pl(t){let e;const n=new At({props:{bordered:!0,$$slots:{default:[gl]},$$scope:{ctx:t}}});return{c(){nt(n.$$.fragment)},m(t,o){ot(n,t,o),e=!0},p(t,e){const o={};16447&e&&(o.$$scope={dirty:e,ctx:t}),n.$set(o)},i(t){e||(W(n.$$.fragment,t),e=!0)},o(t){K(n.$$.fragment,t),e=!1},d(t){lt(n,t)}}}function ml(t){let e,n;return{c(){e=g("i"),n=h(" Actualizar"),x(e,"class","fa fa-refresh"),x(e,"aria-hidden","true")},m(t,o){$(t,e,o),$(t,n,o)},d(t){t&&p(e),t&&p(n)}}}function gl(t){let e,n,o,s,r,c,a,i,u,d,m,b,k,T,O,N,I,A,L,S,C,P,j,M,H;const R=new Bt({props:{outline:!0,color:"primary",$$slots:{default:[ml]},$$scope:{ctx:t}}});return R.$on("click",t[8]),{c(){e=g("thead"),e.innerHTML="<tr><th>Nombre</th> \n                    <th>País</th> \n                    <th>Debut</th> \n                    <th>Goles</th> \n                    <th>Partidos</th> \n                    <th>Equipos</th> \n                    <th>Acciones</th></tr>",n=y(),o=g("tbody"),s=g("tr"),r=g("td"),c=h(t[0]),a=y(),i=g("td"),u=h(t[2]),d=y(),m=g("td"),b=h(t[1]),k=y(),T=g("td"),O=g("input"),N=y(),I=g("td"),A=g("input"),L=y(),S=g("td"),C=g("input"),P=y(),j=g("td"),nt(R.$$.fragment),x(O,"type","number"),x(A,"type","number"),x(C,"type","number")},m(p,g,h){$(p,e,g),$(p,n,g),$(p,o,g),f(o,s),f(s,r),f(r,c),f(s,a),f(s,i),f(i,u),f(s,d),f(s,m),f(m,b),f(s,k),f(s,T),f(T,O),E(O,t[3]),f(s,N),f(s,I),f(I,A),E(A,t[4]),f(s,L),f(s,S),f(S,C),E(C,t[5]),f(s,P),f(s,j),ot(R,j,null),M=!0,h&&l(H),H=[v(O,"input",t[11]),v(A,"input",t[12]),v(C,"input",t[13])]},p(t,e){(!M||1&e)&&_(c,t[0]),(!M||4&e)&&_(u,t[2]),(!M||2&e)&&_(b,t[1]),8&e&&w(O.value)!==t[3]&&E(O,t[3]),16&e&&w(A.value)!==t[4]&&E(A,t[4]),32&e&&w(C.value)!==t[5]&&E(C,t[5]);const n={};16384&e&&(n.$$scope={dirty:e,ctx:t}),R.$set(n)},i(t){M||(W(R.$$.fragment,t),M=!0)},o(t){K(R.$$.fragment,t),M=!1},d(t){t&&p(e),t&&p(n),t&&p(o),lt(R),l(H)}}}function hl(e){let n;return{c(){n=h("Cargando goalscorers...")},m(t,e){$(t,n,e)},p:t,i:t,o:t,d(t){t&&p(n)}}}function yl(t){let e,n,o;return{c(){e=g("p"),n=h("ERROR: "),o=h(t[6]),T(e,"color","red")},m(t,l){$(t,e,l),f(e,n),f(e,o)},p(t,e){64&e&&_(o,t[6])},d(t){t&&p(e)}}}function bl(t){let e,n;return{c(){e=g("i"),n=h(" Atrás"),x(e,"class","fas fa-arrow-circle-left")},m(t,o){$(t,e,o),$(t,n,o)},d(t){t&&p(e),t&&p(n)}}}function vl(t){let e,n,o,l,s,r,c,a,i,u={ctx:t,current:null,token:null,pending:hl,then:pl,catch:$l,value:7,blocks:[,,,]};Q(r=t[7],u);let d=t[6]&&yl(t);const m=new Bt({props:{outline:!0,color:"secondary",$$slots:{default:[bl]},$$scope:{ctx:t}}});return m.$on("click",ht),{c(){e=g("main"),n=g("div"),o=y(),l=g("h3"),l.innerHTML="Editar goleador <strong> params.name</strong>",s=y(),u.block.c(),c=y(),d&&d.c(),a=y(),nt(m.$$.fragment),x(n,"role","alert"),x(n,"id","div_alert"),T(n,"display","none")},m(t,r){$(t,e,r),f(e,n),f(e,o),f(e,l),f(e,s),u.block.m(e,u.anchor=null),u.mount=()=>e,u.anchor=c,f(e,c),d&&d.m(e,null),f(e,a),ot(m,e,null),i=!0},p(n,[o]){if(t=n,u.ctx=t,128&o&&r!==(r=t[7])&&Q(r,u));else{const e=t.slice();e[7]=u.resolved,u.block.p(e,o)}t[6]?d?d.p(t,o):(d=yl(t),d.c(),d.m(e,a)):d&&(d.d(1),d=null);const l={};16384&o&&(l.$$scope={dirty:o,ctx:t}),m.$set(l)},i(t){i||(W(u.block),W(m.$$.fragment,t),i=!0)},o(t){for(let t=0;t<3;t+=1){K(u.blocks[t])}K(m.$$.fragment,t),i=!1},d(t){t&&p(e),u.block.d(),u.token=null,u=null,d&&d.d(),lt(m)}}}function xl(t){kl();var e=document.getElementById("div_alert");e.style="position: fixed; top: 0px; top: 2%; width: 90%;",e.className="alert alert-dismissible in alert-danger ",e.innerHTML="<strong>Error</strong> Ha ocurrido un error "+t,setTimeout(()=>{kl()},3e3)}function kl(){var t=document.getElementById("div_alert");t.style="display: none; ",t.className="alert alert-dismissible in",t.innerHTML=""}function wl(t,e,n){let o,l,s,r,c,a,i,{params:u={}}=e,d={};async function f(){console.log("Fetching goalscorer...");const t=await fetch("/api/v2/goalscorers/"+u.name);if(t.ok){console.log("Ok:");const e=await t.json();n(7,d=e),n(0,o=d.name),n(1,l=d.debut),n(2,s=d.country),n(3,r=d.goals),n(4,c=d.matches),n(5,a=d.teams),console.log("Goalscorer received")}else n(6,i=t.status+": "+t.statusText),console.log("Error"+i)}return S(f),t.$set=t=>{"params"in t&&n(9,u=t.params)},[o,l,s,r,c,a,i,d,async function(){console.log("Updating goalscorer..."+JSON.stringify(u.name)),await fetch("/api/v2/goalscorers/"+u.name,{method:"PUT",body:JSON.stringify({name:o,debut:parseInt(l),country:s,goals:r,matches:c,teams:a}),headers:{"Content-Type":"application/json"}}).then((function(t){t.ok?(f(),function(){kl();var t=document.getElementById("div_alert");t.style="position: fixed; top: 0px; top: 2%; width: 90%;",t.className="alert alert-dismissible in alert-info ",t.innerHTML="<strong>Dato actualizado.</strong> Se ha actualizado el dato correctamente",setTimeout(()=>{kl()},3e3)}()):404==t.status?xl("Se ha intentado actualizar un elemento inexistente."):xl("")}))},u,f,function(){r=w(this.value),n(3,r)},function(){c=w(this.value),n(4,c)},function(){a=w(this.value),n(5,a)}]}class _l extends ct{constructor(t){super(),rt(this,t,wl,vl,r,{params:9})}}function El(e){let n;return{c(){n=g("main"),n.innerHTML="<h1>Página no encontrada</h1>"},m(t,e){$(t,n,e)},p:t,i:t,o:t,d(t){t&&p(n)}}}class Tl extends ct{constructor(t){super(),rt(this,t,null,El,r,{})}}function Ol(e){let n,o;const l=new bt({props:{routes:e[0]}});return{c(){n=g("main"),nt(l.$$.fragment)},m(t,e){$(t,n,e),ot(l,n,null),o=!0},p:t,i(t){o||(W(l.$$.fragment,t),o=!0)},o(t){K(l.$$.fragment,t),o=!1},d(t){t&&p(n),lt(l)}}}function Nl(t){return[{"/":xt,"/global-coef/:team/:year":An,"/globalCoefAPI":hn,"/global-transfers/:year/:team":Lo,"/globaltransfersAPI":bo,"/goalscorers/:name":_l,"/goalscorersAPI":fl,"*":Tl}]}return new class extends ct{constructor(t){super(),rt(this,t,Nl,Ol,r,{})}}({target:document.querySelector("#SvelteApp")})}();
>>>>>>> b7b9944e550cd955a959ad664f21ddbe7248b067
//# sourceMappingURL=bundle.js.map
