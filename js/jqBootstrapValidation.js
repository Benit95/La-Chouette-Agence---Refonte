(function (e) {
	var a = [];
	var f = {
		options: {
			prependExistingHelpBlock: false,
			sniffHtml: true,
			preventSubmit: true,
			submitError: false,
			submitSuccess: false,
			semanticallyStrict: false,
			autoAdd: {
				helpBlocks: true
			},
			filter: function () {
				return true
			}
		},
		methods: {
			init: function (i) {
				var j = e.extend(true, {}, f);
				j.options = e.extend(true, j.options, i);
				var k = this;
				var h = e.unique(k.map(function () {
					return e(this).parents("form")[0]
				}).toArray());
				e(h).bind("submit", function (n) {
					var l = e(this);
					var o = 0;
					var m = l.find("input,textarea,select").not("[type=submit],[type=image]").filter(j.options.filter);
					m.trigger("submit.validation").trigger("validationLostFocus.validation");
					m.each(function (p, q) {
						var r = e(q),
							s = r.parents(".form-group, .checkbox").first();
						if (s.hasClass("warning")) {
							s.removeClass("warning").addClass("error");
							o++
						}
					});
					m.trigger("validationLostFocus.validation");
					if (o) {
						if (j.options.preventSubmit) {
							n.preventDefault()
						}
						l.addClass("error");
						if (e.isFunction(j.options.submitError)) {
							j.options.submitError(l, n, m.jqBootstrapValidation("collectErrors", true))
						}
					} else {
						l.removeClass("error");
						if (e.isFunction(j.options.submitSuccess)) {
							j.options.submitSuccess(l, n)
						}
					}
				});
				return this.each(function () {
					var q = e(this),
						p = q.parents(".form-group, .checkbox").first(),
						t = p.find(".help-block").first(),
						v = q.parents("form").first(),
						l = [];
					if (!t.length && j.options.autoAdd && j.options.autoAdd.helpBlocks) {
						t = e('<div class="help-block" />');
						p.append(t);
						a.push(t[0])
					}
					if (j.options.sniffHtml) {
						var u = "";
						if (q.attr("pattern") !== undefined) {
							u = "Not in the expected format<!-- data-validation-pattern-message to override -->";
							if (q.data("validationPatternMessage")) {
								u = q.data("validationPatternMessage")
							}
							q.data("validationPatternMessage", u);
							q.data("validationPatternRegex", q.attr("pattern"))
						}
						if (q.attr("max") !== undefined || q.attr("aria-valuemax") !== undefined) {
							var s = (q.attr("max") !== undefined ? q.attr("max") : q.attr("aria-valuemax"));
							u = "Too high: Maximum of '" + s + "'<!-- data-validation-max-message to override -->";
							if (q.data("validationMaxMessage")) {
								u = q.data("validationMaxMessage")
							}
							q.data("validationMaxMessage", u);
							q.data("validationMaxMax", s)
						}
						if (q.attr("min") !== undefined || q.attr("aria-valuemin") !== undefined) {
							var n = (q.attr("min") !== undefined ? q.attr("min") : q.attr("aria-valuemin"));
							u = "Too low: Minimum of '" + n + "'<!-- data-validation-min-message to override -->";
							if (q.data("validationMinMessage")) {
								u = q.data("validationMinMessage")
							}
							q.data("validationMinMessage", u);
							q.data("validationMinMin", n)
						}
						if (q.attr("maxlength") !== undefined) {
							u = "Too long: Maximum of '" + q.attr("maxlength") + "' characters<!-- data-validation-maxlength-message to override -->";
							if (q.data("validationMaxlengthMessage")) {
								u = q.data("validationMaxlengthMessage")
							}
							q.data("validationMaxlengthMessage", u);
							q.data("validationMaxlengthMaxlength", q.attr("maxlength"))
						}
						if (q.attr("minlength") !== undefined) {
							u = "Too short: Minimum of '" + q.attr("minlength") + "' characters<!-- data-validation-minlength-message to override -->";
							if (q.data("validationMinlengthMessage")) {
								u = q.data("validationMinlengthMessage")
							}
							q.data("validationMinlengthMessage", u);
							q.data("validationMinlengthMinlength", q.attr("minlength"))
						}
						if (q.attr("required") !== undefined || q.attr("aria-required") !== undefined) {
							u = j.builtInValidators.required.message;
							if (q.data("validationRequiredMessage")) {
								u = q.data("validationRequiredMessage")
							}
							q.data("validationRequiredMessage", u)
						}
						if (q.attr("type") !== undefined && q.attr("type").toLowerCase() === "number") {
							u = j.builtInValidators.number.message;
							if (q.data("validationNumberMessage")) {
								u = q.data("validationNumberMessage")
							}
							q.data("validationNumberMessage", u)
						}
						if (q.attr("type") !== undefined && q.attr("type").toLowerCase() === "email") {
							u = "Not a valid email address<!-- data-validator-validemail-message to override -->";
							if (q.data("validationValidemailMessage")) {
								u = q.data("validationValidemailMessage")
							} else {
								if (q.data("validationEmailMessage")) {
									u = q.data("validationEmailMessage")
								}
							}
							q.data("validationValidemailMessage", u)
						}
						if (q.attr("minchecked") !== undefined) {
							u = "Not enough options checked; Minimum of '" + q.attr("minchecked") + "' required<!-- data-validation-minchecked-message to override -->";
							if (q.data("validationMincheckedMessage")) {
								u = q.data("validationMincheckedMessage")
							}
							q.data("validationMincheckedMessage", u);
							q.data("validationMincheckedMinchecked", q.attr("minchecked"))
						}
						if (q.attr("maxchecked") !== undefined) {
							u = "Too many options checked; Maximum of '" + q.attr("maxchecked") + "' required<!-- data-validation-maxchecked-message to override -->";
							if (q.data("validationMaxcheckedMessage")) {
								u = q.data("validationMaxcheckedMessage")
							}
							q.data("validationMaxcheckedMessage", u);
							q.data("validationMaxcheckedMaxchecked", q.attr("maxchecked"))
						}
					}
					if (q.data("validation") !== undefined) {
						l = q.data("validation").split(",")
					}
					e.each(q.data(), function (w, x) {
						var y = w.replace(/([A-Z])/g, ",$1").split(",");
						if (y[0] === "validation" && y[1]) {
							l.push(y[1])
						}
					});
					var o = l;
					var r = [];
					do {
						e.each(l, function (w, x) {
							l[w] = d(x)
						});
						l = e.unique(l);
						r = [];
						e.each(o, function (x, y) {
							if (q.data("validation" + y + "Shortcut") !== undefined) {
								e.each(q.data("validation" + y + "Shortcut").split(","), function (A, z) {
									r.push(z)
								})
							} else {
								if (j.builtInValidators[y.toLowerCase()]) {
									var w = j.builtInValidators[y.toLowerCase()];
									if (w.type.toLowerCase() === "shortcut") {
										e.each(w.shortcut.split(","), function (z, A) {
											A = d(A);
											r.push(A);
											l.push(A)
										})
									}
								}
							}
						});
						o = r
					} while (o.length > 0);
					var m = {};
					e.each(l, function (x, z) {
						var A = q.data("validation" + z + "Message");
						var C = (A !== undefined);
						var y = false;
						A = (A ? A : "'" + z + "' validation failed <!-- Add attribute 'data-validation-" + z.toLowerCase() + "-message' to input to change this message -->");
						e.each(j.validatorTypes, function (D, E) {
							if (m[D] === undefined) {
								m[D] = []
							}
							if (!y && q.data("validation" + z + d(E.name)) !== undefined) {
								m[D].push(e.extend(true, {
									name: d(E.name),
									message: A
								}, E.init(q, z)));
								y = true
							}
						});
						if (!y && j.builtInValidators[z.toLowerCase()]) {
							var w = e.extend(true, {}, j.builtInValidators[z.toLowerCase()]);
							if (C) {
								w.message = A
							}
							var B = w.type.toLowerCase();
							if (B === "shortcut") {
								y = true
							} else {
								e.each(j.validatorTypes, function (D, E) {
									if (m[D] === undefined) {
										m[D] = []
									}
									if (!y && B === D.toLowerCase()) {
										q.data("validation" + z + d(E.name), w[E.name.toLowerCase()]);
										m[B].push(e.extend(w, E.init(q, z)));
										y = true
									}
								})
							}
						}
						if (!y) {
							e.error("Cannot find validation info for '" + z + "'")
						}
					});
					t.data("original-contents", (t.data("original-contents") ? t.data("original-contents") : t.html()));
					t.data("original-role", (t.data("original-role") ? t.data("original-role") : t.attr("role")));
					p.data("original-classes", (p.data("original-clases") ? p.data("original-classes") : p.attr("class")));
					q.data("original-aria-invalid", (q.data("original-aria-invalid") ? q.data("original-aria-invalid") : q.attr("aria-invalid")));
					q.bind("validation.validation", function (x, z) {
						var y = c(q);
						var w = [];
						e.each(m, function (A, B) {
							if (y || y.length || (z && z.includeEmpty) || (!!j.validatorTypes[A].blockSubmit && z && !!z.submitting)) {
								e.each(B, function (D, C) {
									if (j.validatorTypes[A].validate(q, y, C)) {
										w.push(C.message)
									}
								})
							}
						});
						return w
					});
					q.bind("getValidators.validation", function () {
						return m
					});
					q.bind("submit.validation", function () {
						return q.triggerHandler("change.validation", {
							submitting: true
						})
					});
					q.bind(["keyup", "focus", "blur", "click", "keydown", "keypress", "change"].join(".validation ") + ".validation", function (y, z) {
						var x = c(q);
						var w = [];
						p.find("input,textarea,select").each(function (C, D) {
							var A = w.length;
							e.each(e(D).triggerHandler("validation.validation", z), function (E, F) {
								w.push(F)
							});
							if (w.length > A) {
								e(D).attr("aria-invalid", "true")
							} else {
								var B = q.data("original-aria-invalid");
								e(D).attr("aria-invalid", (B !== undefined ? B : false))
							}
						});
						v.find("input,select,textarea").not(q).not('[name="' + q.attr("name") + '"]').trigger("validationLostFocus.validation");
						w = e.unique(w.sort());
						if (w.length) {
							p.removeClass("success error").addClass("warning");
							if (j.options.semanticallyStrict && w.length === 1) {
								t.html(w[0] + (j.options.prependExistingHelpBlock ? t.data("original-contents") : ""))
							} else {
								t.html('<ul class="list-unstyled alert alert-warning" role="alert"><li>' + w.join("</li><li>") + "</li></ul>" + (j.options.prependExistingHelpBlock ? t.data("original-contents") : ""))
							}
						} else {
							p.removeClass("warning error success");
							if (x.length > 0) {
								p.addClass("success")
							}
							t.html(t.data("original-contents"))
						}
						if (y.type === "blur") {
							p.removeClass("success")
						}
					});
					q.bind("validationLostFocus.validation", function () {
						p.removeClass("success")
					})
				})
			},
			destroy: function () {
				return this.each(function () {
					var h = e(this),
						j = h.parents(".form-group, .checkbox").first(),
						i = j.find(".help-block").first();
					h.unbind(".validation");
					i.html(i.data("original-contents"));
					j.attr("class", j.data("original-classes"));
					h.attr("aria-invalid", h.data("original-aria-invalid"));
					i.attr("role", h.data("original-role"));
					if (a.indexOf(i[0]) > -1) {
						i.remove()
					}
				})
			},
			collectErrors: function (h) {
				var i = {};
				this.each(function (l, m) {
					var k = e(m);
					var j = k.attr("name");
					var n = k.triggerHandler("validation.validation", {
						includeEmpty: true
					});
					i[j] = e.extend(true, n, i[j])
				});
				e.each(i, function (j, k) {
					if (k.length === 0) {
						delete i[j]
					}
				});
				return i
			},
			hasErrors: function () {
				var h = [];
				this.each(function (j, k) {
					h = h.concat(e(k).triggerHandler("getValidators.validation") ? e(k).triggerHandler("validation.validation", {
						submitting: true
					}) : [])
				});
				return (h.length > 0)
			},
			override: function (h) {
				f = e.extend(true, f, h)
			}
		},
		validatorTypes: {
			callback: {
				name: "callback",
				init: function (i, h) {
					return {
						validatorName: h,
						callback: i.data("validation" + h + "Callback"),
						lastValue: i.val(),
						lastValid: true,
						lastFinished: true
					}
				},
				validate: function (k, j, i) {
					if (i.lastValue === j && i.lastFinished) {
						return !i.lastValid
					}
					if (i.lastFinished === true) {
						i.lastValue = j;
						i.lastValid = true;
						i.lastFinished = false;
						var l = i;
						var h = k;
						b(i.callback, window, k, j, function (m) {
							if (l.lastValue === m.value) {
								l.lastValid = m.valid;
								if (m.message) {
									l.message = m.message
								}
								l.lastFinished = true;
								h.data("validation" + l.validatorName + "Message", l.message);
								setTimeout(function () {
									h.trigger("change.validation")
								}, 1)
							}
						})
					}
					return false
				}
			},
			ajax: {
				name: "ajax",
				init: function (i, h) {
					return {
						validatorName: h,
						url: i.data("validation" + h + "Ajax"),
						lastValue: i.val(),
						lastValid: true,
						lastFinished: true
					}
				},
				validate: function (j, i, h) {
					if ("" + h.lastValue === "" + i && h.lastFinished === true) {
						return h.lastValid === false
					}
					if (h.lastFinished === true) {
						h.lastValue = i;
						h.lastValid = true;
						h.lastFinished = false;
						e.ajax({
							url: h.url,
							data: "value=" + i + "&field=" + j.attr("name"),
							dataType: "json",
							success: function (k) {
								if ("" + h.lastValue === "" + k.value) {
									h.lastValid = !!(k.valid);
									if (k.message) {
										h.message = k.message
									}
									h.lastFinished = true;
									j.data("validation" + h.validatorName + "Message", h.message);
									setTimeout(function () {
										j.trigger("change.validation")
									}, 1)
								}
							},
							failure: function () {
								h.lastValid = true;
								h.message = "ajax call failed";
								h.lastFinished = true;
								j.data("validation" + h.validatorName + "Message", h.message);
								setTimeout(function () {
									j.trigger("change.validation")
								}, 1)
							}
						})
					}
					return false
				}
			},
			regex: {
				name: "regex",
				init: function (i, h) {
					return {
						regex: g(i.data("validation" + h + "Regex"))
					}
				},
				validate: function (j, i, h) {
					return (!h.regex.test(i) && !h.negative) || (h.regex.test(i) && h.negative)
				}
			},
			required: {
				name: "required",
				init: function (i, h) {
					return {}
				},
				validate: function (j, i, h) {
					return !!(i.length === 0 && !h.negative) || !!(i.length > 0 && h.negative)
				},
				blockSubmit: true
			},
			match: {
				name: "match",
				init: function (j, h) {
					var i = j.parents("form").first().find('[name="' + j.data("validation" + h + "Match") + '"]').first();
					i.bind("validation.validation", function () {
						j.trigger("change.validation", {
							submitting: true
						})
					});
					return {
						element: i
					}
				},
				validate: function (j, i, h) {
					return (i !== h.element.val() && !h.negative) || (i === h.element.val() && h.negative)
				},
				blockSubmit: true
			},
			max: {
				name: "max",
				init: function (i, h) {
					return {
						max: i.data("validation" + h + "Max")
					}
				},
				validate: function (j, i, h) {
					return (parseFloat(i, 10) > parseFloat(h.max, 10) && !h.negative) || (parseFloat(i, 10) <= parseFloat(h.max, 10) && h.negative)
				}
			},
			min: {
				name: "min",
				init: function (i, h) {
					return {
						min: i.data("validation" + h + "Min")
					}
				},
				validate: function (j, i, h) {
					return (parseFloat(i) < parseFloat(h.min) && !h.negative) || (parseFloat(i) >= parseFloat(h.min) && h.negative)
				}
			},
			maxlength: {
				name: "maxlength",
				init: function (i, h) {
					return {
						maxlength: i.data("validation" + h + "Maxlength")
					}
				},
				validate: function (j, i, h) {
					return ((i.length > h.maxlength) && !h.negative) || ((i.length <= h.maxlength) && h.negative)
				}
			},
			minlength: {
				name: "minlength",
				init: function (i, h) {
					return {
						minlength: i.data("validation" + h + "Minlength")
					}
				},
				validate: function (j, i, h) {
					return ((i.length < h.minlength) && !h.negative) || ((i.length >= h.minlength) && h.negative)
				}
			},
			maxchecked: {
				name: "maxchecked",
				init: function (j, h) {
					var i = j.parents("form").first().find('[name="' + j.attr("name") + '"]');
					i.bind("click.validation", function () {
						j.trigger("change.validation", {
							includeEmpty: true
						})
					});
					return {
						maxchecked: j.data("validation" + h + "Maxchecked"),
						elements: i
					}
				},
				validate: function (j, i, h) {
					return (h.elements.filter(":checked").length > h.maxchecked && !h.negative) || (h.elements.filter(":checked").length <= h.maxchecked && h.negative)
				},
				blockSubmit: true
			},
			minchecked: {
				name: "minchecked",
				init: function (j, h) {
					var i = j.parents("form").first().find('[name="' + j.attr("name") + '"]');
					i.bind("click.validation", function () {
						j.trigger("change.validation", {
							includeEmpty: true
						})
					});
					return {
						minchecked: j.data("validation" + h + "Minchecked"),
						elements: i
					}
				},
				validate: function (j, i, h) {
					return (h.elements.filter(":checked").length < h.minchecked && !h.negative) || (h.elements.filter(":checked").length >= h.minchecked && h.negative)
				},
				blockSubmit: true
			}
		},
		builtInValidators: {
			email: {
				name: "Email",
				type: "shortcut",
				shortcut: "validemail"
			},
			validemail: {
				name: "Validemail",
				type: "regex",
				regex: "[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,10}",
				message: "Not a valid email address<!-- data-validator-validemail-message to override -->"
			},
			passwordagain: {
				name: "Passwordagain",
				type: "match",
				match: "password",
				message: "Does not match the given password<!-- data-validator-paswordagain-message to override -->"
			},
			positive: {
				name: "Positive",
				type: "shortcut",
				shortcut: "number,positivenumber"
			},
			negative: {
				name: "Negative",
				type: "shortcut",
				shortcut: "number,negativenumber"
			},
			number: {
				name: "Number",
				type: "regex",
				regex: "([+-]?\\\d+(\\.\\\d*)?([eE][+-]?[0-9]+)?)?",
				message: "Must be a number<!-- data-validator-number-message to override -->"
			},
			integer: {
				name: "Integer",
				type: "regex",
				regex: "[+-]?\\\d+",
				message: "No decimal places allowed<!-- data-validator-integer-message to override -->"
			},
			positivenumber: {
				name: "Positivenumber",
				type: "min",
				min: 0,
				message: "Must be a positive number<!-- data-validator-positivenumber-message to override -->"
			},
			negativenumber: {
				name: "Negativenumber",
				type: "max",
				max: 0,
				message: "Must be a negative number<!-- data-validator-negativenumber-message to override -->"
			},
			required: {
				name: "Required",
				type: "required",
				message: "This is required<!-- data-validator-required-message to override -->"
			},
			checkone: {
				name: "Checkone",
				type: "minchecked",
				minchecked: 1,
				message: "Check at least one option<!-- data-validation-checkone-message to override -->"
			}
		}
	};
	var d = function (h) {
		return h.toLowerCase().replace(/(^|\s)([a-z])/g, function (i, k, j) {
			return k + j.toUpperCase()
		})
	};
	var c = function (j) {
		var i = j.val();
		var h = j.attr("type");
		if (h === "checkbox") {
			i = (j.is(":checked") ? i : "")
		}
		if (h === "radio") {
			i = (e('input[name="' + j.attr("name") + '"]:checked').length > 0 ? i : "")
		}
		return i
	};

	function g(h) {
		return new RegExp("^" + h + "$")
	}

	function b(n, k) {
		var h = Array.prototype.slice.call(arguments).splice(2);
		var m = n.split(".");
		var l = m.pop();
		for (var j = 0; j < m.length; j++) {
			k = k[m[j]]
		}
		return k[l].apply(this, h)
	}
	e.fn.jqBootstrapValidation = function (h) {
		if (f.methods[h]) {
			return f.methods[h].apply(this, Array.prototype.slice.call(arguments, 1))
		} else {
			if (typeof h === "object" || !h) {
				return f.methods.init.apply(this, arguments)
			} else {
				e.error("Method " + h + " does not exist on jQuery.jqBootstrapValidation");
				return null
			}
		}
	};
	e.jqBootstrapValidation = function (h) {
		e(":input").not("[type=image],[type=submit]").jqBootstrapValidation.apply(this, arguments)
	}
})(jQuery);