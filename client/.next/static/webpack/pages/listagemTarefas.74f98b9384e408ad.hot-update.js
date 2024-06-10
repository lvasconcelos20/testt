"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/listagemTarefas",{

/***/ "./src/pages/listagemTarefas/index.jsx":
/*!*********************************************!*\
  !*** ./src/pages/listagemTarefas/index.jsx ***!
  \*********************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _services_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/api */ \"./src/services/api.js\");\n/* harmony import */ var _style__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./style */ \"./src/pages/listagemTarefas/style.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_4__);\n\nvar _s = $RefreshSig$();\n\n\n\n\nconst ListTarefas = ()=>{\n    _s();\n    const [tasks, setTasks] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);\n    const [email, setEmail] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const [isLoading, setIsLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const [noResults, setNoResults] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const [selectedTask, setSelectedTask] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null); // Estado para armazenar a tarefa selecionada\n    const [editMode, setEditMode] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false); // Estado para controle do modo de edição\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        listarTarefas(); // Executa a busca assim que o email mudar\n    }, [\n        email\n    ]);\n    const listarTarefas = async ()=>{\n        if (!email) return;\n        setIsLoading(true);\n        try {\n            const response = await _services_api__WEBPACK_IMPORTED_MODULE_2__[\"default\"].get(\"/tarefa/\".concat(email));\n            if (response.data.length === 0) {\n                setNoResults(true);\n            } else {\n                setTasks(response.data);\n                setNoResults(false);\n            }\n        } catch (error) {\n            console.error(\"Erro ao listar tarefas:\", error);\n        } finally{\n            setIsLoading(false);\n        }\n    };\n    const handleTaskClick = (task)=>{\n        setSelectedTask(task);\n    };\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_4__.useRouter)();\n    const handleNextEdit = ()=>{\n        router.push(\"../editTarefa\");\n    };\n    const handleNextCadastro = ()=>{\n        router.push(\"../cadastroTarefas\");\n    };\n    const handleDeleteButtonClick = async (taskId)=>{\n        try {\n            await _services_api__WEBPACK_IMPORTED_MODULE_2__[\"default\"][\"delete\"](\"/tarefa/\".concat(taskId));\n            // Remove a tarefa do estado após exclusão bem-sucedida\n            setTasks((prevTasks)=>prevTasks.filter((task)=>task.id !== taskId));\n        } catch (error) {\n            console.error(\"Erro ao excluir tarefa:\", error);\n        }\n    };\n    const handleUpdateFinalizada = async (taskId, finalizada)=>{\n        try {\n            await _services_api__WEBPACK_IMPORTED_MODULE_2__[\"default\"].patch(\"/tarefa/\".concat(taskId), {\n                finalizada\n            });\n            // Atualiza o estado das tarefas após a atualização bem-sucedida\n            setTasks((prevTasks)=>prevTasks.map((task)=>task.id === taskId ? {\n                        ...task,\n                        finalizada\n                    } : task));\n        } catch (error) {\n            console.error(\"Erro ao atualizar tarefa:\", error);\n        }\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_style__WEBPACK_IMPORTED_MODULE_3__.Page, {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_style__WEBPACK_IMPORTED_MODULE_3__.Container, {\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                    children: \"Lista de Tarefas\"\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\felipe\\\\projeto\\\\ultimo\\\\testt\\\\client\\\\src\\\\pages\\\\listagemTarefas\\\\index.jsx\",\n                    lineNumber: 76,\n                    columnNumber: 9\n                }, undefined),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_style__WEBPACK_IMPORTED_MODULE_3__.Form, {\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_style__WEBPACK_IMPORTED_MODULE_3__.Input, {\n                        type: \"text\",\n                        placeholder: \"Digite o email do membro\",\n                        value: email,\n                        onChange: (e)=>setEmail(e.target.value)\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\felipe\\\\projeto\\\\ultimo\\\\testt\\\\client\\\\src\\\\pages\\\\listagemTarefas\\\\index.jsx\",\n                        lineNumber: 78,\n                        columnNumber: 11\n                    }, undefined)\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\felipe\\\\projeto\\\\ultimo\\\\testt\\\\client\\\\src\\\\pages\\\\listagemTarefas\\\\index.jsx\",\n                    lineNumber: 77,\n                    columnNumber: 9\n                }, undefined),\n                isLoading ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_style__WEBPACK_IMPORTED_MODULE_3__.Loading, {\n                    children: \"Carregando...\"\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\felipe\\\\projeto\\\\ultimo\\\\testt\\\\client\\\\src\\\\pages\\\\listagemTarefas\\\\index.jsx\",\n                    lineNumber: 86,\n                    columnNumber: 11\n                }, undefined) : noResults ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_style__WEBPACK_IMPORTED_MODULE_3__.NoResults, {\n                    children: \"Nenhuma tarefa encontrada.\"\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\felipe\\\\projeto\\\\ultimo\\\\testt\\\\client\\\\src\\\\pages\\\\listagemTarefas\\\\index.jsx\",\n                    lineNumber: 88,\n                    columnNumber: 11\n                }, undefined) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_style__WEBPACK_IMPORTED_MODULE_3__.TaskList, {\n                            children: tasks.map((tarefa, index)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_style__WEBPACK_IMPORTED_MODULE_3__.TaskItem, {\n                                    onClick: ()=>handleTaskClick(tarefa),\n                                    children: [\n                                        \"Nome: \",\n                                        tarefa.name,\n                                        \", Prioridade: \",\n                                        tarefa.prioridade,\n                                        \", Finalizada: \",\n                                        tarefa.finalizada ? \"Sim\" : \"N\\xe3o\",\n                                        (selectedTask === null || selectedTask === void 0 ? void 0 : selectedTask.id) === tarefa.id && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_style__WEBPACK_IMPORTED_MODULE_3__.TaskDetails, {\n                                            onClick: handleNextEdit,\n                                            children: [\n                                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h3\", {\n                                                    children: \"Descri\\xe7\\xe3o:\"\n                                                }, void 0, false, {\n                                                    fileName: \"C:\\\\Users\\\\felipe\\\\projeto\\\\ultimo\\\\testt\\\\client\\\\src\\\\pages\\\\listagemTarefas\\\\index.jsx\",\n                                                    lineNumber: 100,\n                                                    columnNumber: 23\n                                                }, undefined),\n                                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                                    children: tarefa.descricao\n                                                }, void 0, false, {\n                                                    fileName: \"C:\\\\Users\\\\felipe\\\\projeto\\\\ultimo\\\\testt\\\\client\\\\src\\\\pages\\\\listagemTarefas\\\\index.jsx\",\n                                                    lineNumber: 101,\n                                                    columnNumber: 23\n                                                }, undefined),\n                                                editMode && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                                    children: [\n                                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"label\", {\n                                                            children: [\n                                                                \"Finalizada:\",\n                                                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                                                                    type: \"checkbox\",\n                                                                    checked: tarefa.finalizada,\n                                                                    onChange: (e)=>handleUpdateFinalizada(tarefa.id, e.target.checked)\n                                                                }, void 0, false, {\n                                                                    fileName: \"C:\\\\Users\\\\felipe\\\\projeto\\\\ultimo\\\\testt\\\\client\\\\src\\\\pages\\\\listagemTarefas\\\\index.jsx\",\n                                                                    lineNumber: 106,\n                                                                    columnNumber: 29\n                                                                }, undefined)\n                                                            ]\n                                                        }, void 0, true, {\n                                                            fileName: \"C:\\\\Users\\\\felipe\\\\projeto\\\\ultimo\\\\testt\\\\client\\\\src\\\\pages\\\\listagemTarefas\\\\index.jsx\",\n                                                            lineNumber: 104,\n                                                            columnNumber: 27\n                                                        }, undefined),\n                                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_style__WEBPACK_IMPORTED_MODULE_3__.EditButton, {\n                                                            onClick: ()=>setEditMode(false),\n                                                            children: \"Cancelar Edi\\xe7\\xe3o\"\n                                                        }, void 0, false, {\n                                                            fileName: \"C:\\\\Users\\\\felipe\\\\projeto\\\\ultimo\\\\testt\\\\client\\\\src\\\\pages\\\\listagemTarefas\\\\index.jsx\",\n                                                            lineNumber: 112,\n                                                            columnNumber: 27\n                                                        }, undefined),\n                                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_style__WEBPACK_IMPORTED_MODULE_3__.DeleteButton, {\n                                                            onClick: ()=>handleDeleteButtonClick(tarefa.id),\n                                                            children: \"Excluir Tarefa\"\n                                                        }, void 0, false, {\n                                                            fileName: \"C:\\\\Users\\\\felipe\\\\projeto\\\\ultimo\\\\testt\\\\client\\\\src\\\\pages\\\\listagemTarefas\\\\index.jsx\",\n                                                            lineNumber: 113,\n                                                            columnNumber: 27\n                                                        }, undefined)\n                                                    ]\n                                                }, void 0, true, {\n                                                    fileName: \"C:\\\\Users\\\\felipe\\\\projeto\\\\ultimo\\\\testt\\\\client\\\\src\\\\pages\\\\listagemTarefas\\\\index.jsx\",\n                                                    lineNumber: 103,\n                                                    columnNumber: 25\n                                                }, undefined)\n                                            ]\n                                        }, void 0, true, {\n                                            fileName: \"C:\\\\Users\\\\felipe\\\\projeto\\\\ultimo\\\\testt\\\\client\\\\src\\\\pages\\\\listagemTarefas\\\\index.jsx\",\n                                            lineNumber: 99,\n                                            columnNumber: 21\n                                        }, undefined)\n                                    ]\n                                }, index, true, {\n                                    fileName: \"C:\\\\Users\\\\felipe\\\\projeto\\\\ultimo\\\\testt\\\\client\\\\src\\\\pages\\\\listagemTarefas\\\\index.jsx\",\n                                    lineNumber: 93,\n                                    columnNumber: 17\n                                }, undefined))\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\felipe\\\\projeto\\\\ultimo\\\\testt\\\\client\\\\src\\\\pages\\\\listagemTarefas\\\\index.jsx\",\n                            lineNumber: 91,\n                            columnNumber: 13\n                        }, undefined),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_style__WEBPACK_IMPORTED_MODULE_3__.Button, {\n                            onClick: handleNextCadastro,\n                            children: \"Criar Nova Tarefa\"\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\felipe\\\\projeto\\\\ultimo\\\\testt\\\\client\\\\src\\\\pages\\\\listagemTarefas\\\\index.jsx\",\n                            lineNumber: 121,\n                            columnNumber: 13\n                        }, undefined)\n                    ]\n                }, void 0, true)\n            ]\n        }, void 0, true, {\n            fileName: \"C:\\\\Users\\\\felipe\\\\projeto\\\\ultimo\\\\testt\\\\client\\\\src\\\\pages\\\\listagemTarefas\\\\index.jsx\",\n            lineNumber: 75,\n            columnNumber: 7\n        }, undefined)\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\felipe\\\\projeto\\\\ultimo\\\\testt\\\\client\\\\src\\\\pages\\\\listagemTarefas\\\\index.jsx\",\n        lineNumber: 74,\n        columnNumber: 5\n    }, undefined);\n};\n_s(ListTarefas, \"TmzwYr33Yrj5hdwUB/zo6o/zvxg=\", false, function() {\n    return [\n        next_router__WEBPACK_IMPORTED_MODULE_4__.useRouter\n    ];\n});\n_c = ListTarefas;\n/* harmony default export */ __webpack_exports__[\"default\"] = (ListTarefas);\nvar _c;\n$RefreshReg$(_c, \"ListTarefas\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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a0MsR0FBRyxDQUFDLENBQUNRLFFBQVFDLHNCQUNsQiw4REFBQ3BELDRDQUFRQTtvQ0FFUHFELFNBQVMsSUFBTXpCLGdCQUFnQnVCOzt3Q0FDaEM7d0NBQ1FBLE9BQU9HLElBQUk7d0NBQUM7d0NBQWVILE9BQU9JLFVBQVU7d0NBQUM7d0NBQWVKLE9BQU9WLFVBQVUsR0FBRyxRQUFRO3dDQUM5RnhCLENBQUFBLHlCQUFBQSxtQ0FBQUEsYUFBY3NCLEVBQUUsTUFBS1ksT0FBT1osRUFBRSxrQkFDN0IsOERBQUNuQywrQ0FBV0E7NENBQUNpRCxTQUFTdEI7OzhEQUNwQiw4REFBQ3lCOzhEQUFHOzs7Ozs7OERBQ0osOERBQUNDOzhEQUFHTixPQUFPTyxTQUFTOzs7Ozs7Z0RBQ25CdkMsMEJBQ0MsOERBQUN3Qzs7c0VBQ0MsOERBQUNDOztnRUFBTTs4RUFFTCw4REFBQ0M7b0VBQ0NoQixNQUFLO29FQUNMaUIsU0FBU1gsT0FBT1YsVUFBVTtvRUFDMUJPLFVBQVUsQ0FBQ0MsSUFBTVQsdUJBQXVCVyxPQUFPWixFQUFFLEVBQUVVLEVBQUVDLE1BQU0sQ0FBQ1ksT0FBTzs7Ozs7Ozs7Ozs7O3NFQUd2RSw4REFBQ3pELDhDQUFVQTs0REFBQ2dELFNBQVMsSUFBTWpDLFlBQVk7c0VBQVE7Ozs7OztzRUFDL0MsOERBQUNkLGdEQUFZQTs0REFBQytDLFNBQVMsSUFBTW5CLHdCQUF3QmlCLE9BQU9aLEVBQUU7c0VBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7bUNBbkJwRWE7Ozs7Ozs7Ozs7c0NBMkJYLDhEQUFDdEQsMENBQU1BOzRCQUFDdUQsU0FBU3BCO3NDQUFxQjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU1sRDtHQTFITXpCOztRQW1DV0Qsa0RBQVNBOzs7S0FuQ3BCQztBQTRITiwrREFBZUEsV0FBV0EsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvcGFnZXMvbGlzdGFnZW1UYXJlZmFzL2luZGV4LmpzeD9hMmU5Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgYXBpIGZyb20gJy4uLy4uL3NlcnZpY2VzL2FwaSc7XHJcbmltcG9ydCB7IENvbnRhaW5lciwgRm9ybSwgSW5wdXQsIEJ1dHRvbiwgVGFza0xpc3QsIFRhc2tJdGVtLCBQYWdlLCBMb2FkaW5nLCBOb1Jlc3VsdHMsIFRhc2tEZXRhaWxzLCBFZGl0QnV0dG9uLCBEZWxldGVCdXR0b24gfSBmcm9tICcuL3N0eWxlJztcclxuaW1wb3J0IHsgdXNlUm91dGVyIH0gZnJvbSAnbmV4dC9yb3V0ZXInO1xyXG5jb25zdCBMaXN0VGFyZWZhcyA9ICgpID0+IHtcclxuICBjb25zdCBbdGFza3MsIHNldFRhc2tzXSA9IHVzZVN0YXRlKFtdKTtcclxuICBjb25zdCBbZW1haWwsIHNldEVtYWlsXSA9IHVzZVN0YXRlKCcnKTtcclxuICBjb25zdCBbaXNMb2FkaW5nLCBzZXRJc0xvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtub1Jlc3VsdHMsIHNldE5vUmVzdWx0c10gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW3NlbGVjdGVkVGFzaywgc2V0U2VsZWN0ZWRUYXNrXSA9IHVzZVN0YXRlKG51bGwpOyAvLyBFc3RhZG8gcGFyYSBhcm1hemVuYXIgYSB0YXJlZmEgc2VsZWNpb25hZGFcclxuICBjb25zdCBbZWRpdE1vZGUsIHNldEVkaXRNb2RlXSA9IHVzZVN0YXRlKGZhbHNlKTsgLy8gRXN0YWRvIHBhcmEgY29udHJvbGUgZG8gbW9kbyBkZSBlZGnDp8Ojb1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgbGlzdGFyVGFyZWZhcygpOyAvLyBFeGVjdXRhIGEgYnVzY2EgYXNzaW0gcXVlIG8gZW1haWwgbXVkYXJcclxuICB9LCBbZW1haWxdKTtcclxuXHJcbiAgY29uc3QgbGlzdGFyVGFyZWZhcyA9IGFzeW5jICgpID0+IHtcclxuICAgIGlmICghZW1haWwpIHJldHVybjtcclxuXHJcbiAgICBzZXRJc0xvYWRpbmcodHJ1ZSk7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkuZ2V0KGAvdGFyZWZhLyR7ZW1haWx9YCk7XHJcbiAgICAgIGlmIChyZXNwb25zZS5kYXRhLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgIHNldE5vUmVzdWx0cyh0cnVlKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzZXRUYXNrcyhyZXNwb25zZS5kYXRhKTtcclxuICAgICAgICBzZXROb1Jlc3VsdHMoZmFsc2UpO1xyXG4gICAgICB9XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmVycm9yKCdFcnJvIGFvIGxpc3RhciB0YXJlZmFzOicsIGVycm9yKTtcclxuICAgIH0gZmluYWxseSB7XHJcbiAgICAgIHNldElzTG9hZGluZyhmYWxzZSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgaGFuZGxlVGFza0NsaWNrID0gKHRhc2spID0+IHtcclxuICAgIHNldFNlbGVjdGVkVGFzayh0YXNrKTtcclxuICB9O1xyXG4gIGNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpO1xyXG4gIGNvbnN0IGhhbmRsZU5leHRFZGl0ID0gKCkgPT4ge1xyXG4gICAgcm91dGVyLnB1c2goJy4uL2VkaXRUYXJlZmEnKTtcclxuICB9O1xyXG4gIGNvbnN0IGhhbmRsZU5leHRDYWRhc3RybyA9ICgpID0+e1xyXG4gICAgcm91dGVyLnB1c2goJy4uL2NhZGFzdHJvVGFyZWZhcycpXHJcbiAgfVxyXG5cclxuXHJcbiAgY29uc3QgaGFuZGxlRGVsZXRlQnV0dG9uQ2xpY2sgPSBhc3luYyAodGFza0lkKSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICBhd2FpdCBhcGkuZGVsZXRlKGAvdGFyZWZhLyR7dGFza0lkfWApO1xyXG4gICAgICAvLyBSZW1vdmUgYSB0YXJlZmEgZG8gZXN0YWRvIGFww7NzIGV4Y2x1c8OjbyBiZW0tc3VjZWRpZGFcclxuICAgICAgc2V0VGFza3MoKHByZXZUYXNrcykgPT4gcHJldlRhc2tzLmZpbHRlcigodGFzaykgPT4gdGFzay5pZCAhPT0gdGFza0lkKSk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmVycm9yKCdFcnJvIGFvIGV4Y2x1aXIgdGFyZWZhOicsIGVycm9yKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBjb25zdCBoYW5kbGVVcGRhdGVGaW5hbGl6YWRhID0gYXN5bmMgKHRhc2tJZCwgZmluYWxpemFkYSkgPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgYXdhaXQgYXBpLnBhdGNoKGAvdGFyZWZhLyR7dGFza0lkfWAsIHsgZmluYWxpemFkYSB9KTtcclxuICAgICAgLy8gQXR1YWxpemEgbyBlc3RhZG8gZGFzIHRhcmVmYXMgYXDDs3MgYSBhdHVhbGl6YcOnw6NvIGJlbS1zdWNlZGlkYVxyXG4gICAgICBzZXRUYXNrcygocHJldlRhc2tzKSA9PlxyXG4gICAgICAgIHByZXZUYXNrcy5tYXAoKHRhc2spID0+XHJcbiAgICAgICAgICB0YXNrLmlkID09PSB0YXNrSWQgPyB7IC4uLnRhc2ssIGZpbmFsaXphZGEgfSA6IHRhc2tcclxuICAgICAgICApXHJcbiAgICAgICk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmVycm9yKCdFcnJvIGFvIGF0dWFsaXphciB0YXJlZmE6JywgZXJyb3IpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8UGFnZT5cclxuICAgICAgPENvbnRhaW5lcj5cclxuICAgICAgICA8aDE+TGlzdGEgZGUgVGFyZWZhczwvaDE+XHJcbiAgICAgICAgPEZvcm0+XHJcbiAgICAgICAgICA8SW5wdXRcclxuICAgICAgICAgICAgdHlwZT1cInRleHRcIlxyXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkRpZ2l0ZSBvIGVtYWlsIGRvIG1lbWJyb1wiXHJcbiAgICAgICAgICAgIHZhbHVlPXtlbWFpbH1cclxuICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRFbWFpbChlLnRhcmdldC52YWx1ZSl9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgIDwvRm9ybT5cclxuICAgICAgICB7aXNMb2FkaW5nID8gKFxyXG4gICAgICAgICAgPExvYWRpbmc+Q2FycmVnYW5kby4uLjwvTG9hZGluZz5cclxuICAgICAgICApIDogbm9SZXN1bHRzID8gKFxyXG4gICAgICAgICAgPE5vUmVzdWx0cz5OZW5odW1hIHRhcmVmYSBlbmNvbnRyYWRhLjwvTm9SZXN1bHRzPlxyXG4gICAgICAgICkgOiAoXHJcbiAgICAgICAgICA8PlxyXG4gICAgICAgICAgICA8VGFza0xpc3Q+XHJcbiAgICAgICAgICAgICAge3Rhc2tzLm1hcCgodGFyZWZhLCBpbmRleCkgPT4gKFxyXG4gICAgICAgICAgICAgICAgPFRhc2tJdGVtXHJcbiAgICAgICAgICAgICAgICAgIGtleT17aW5kZXh9XHJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZVRhc2tDbGljayh0YXJlZmEpfVxyXG4gICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICBOb21lOiB7dGFyZWZhLm5hbWV9LCBQcmlvcmlkYWRlOiB7dGFyZWZhLnByaW9yaWRhZGV9LCBGaW5hbGl6YWRhOiB7dGFyZWZhLmZpbmFsaXphZGEgPyAnU2ltJyA6ICdOw6NvJ31cclxuICAgICAgICAgICAgICAgICAge3NlbGVjdGVkVGFzaz8uaWQgPT09IHRhcmVmYS5pZCAmJiAoXHJcbiAgICAgICAgICAgICAgICAgICAgPFRhc2tEZXRhaWxzIG9uQ2xpY2s9e2hhbmRsZU5leHRFZGl0fT5cclxuICAgICAgICAgICAgICAgICAgICAgIDxoMz5EZXNjcmnDp8Ojbzo8L2gzPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPHA+e3RhcmVmYS5kZXNjcmljYW99PC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAge2VkaXRNb2RlICYmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBGaW5hbGl6YWRhOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJjaGVja2JveFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e3RhcmVmYS5maW5hbGl6YWRhfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IGhhbmRsZVVwZGF0ZUZpbmFsaXphZGEodGFyZWZhLmlkLCBlLnRhcmdldC5jaGVja2VkKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8RWRpdEJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBzZXRFZGl0TW9kZShmYWxzZSl9PkNhbmNlbGFyIEVkacOnw6NvPC9FZGl0QnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxEZWxldGVCdXR0b24gb25DbGljaz17KCkgPT4gaGFuZGxlRGVsZXRlQnV0dG9uQ2xpY2sodGFyZWZhLmlkKX0+RXhjbHVpciBUYXJlZmE8L0RlbGV0ZUJ1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvVGFza0RldGFpbHM+XHJcbiAgICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgICA8L1Rhc2tJdGVtPlxyXG4gICAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgICA8L1Rhc2tMaXN0PlxyXG4gICAgICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9e2hhbmRsZU5leHRDYWRhc3Ryb30gPkNyaWFyIE5vdmEgVGFyZWZhPC9CdXR0b24+XHJcbiAgICAgICAgICA8Lz5cclxuICAgICAgICApfVxyXG4gICAgICA8L0NvbnRhaW5lcj5cclxuICAgIDwvUGFnZT5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgTGlzdFRhcmVmYXM7Il0sIm5hbWVzIjpbIlJlYWN0IiwidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJhcGkiLCJDb250YWluZXIiLCJGb3JtIiwiSW5wdXQiLCJCdXR0b24iLCJUYXNrTGlzdCIsIlRhc2tJdGVtIiwiUGFnZSIsIkxvYWRpbmciLCJOb1Jlc3VsdHMiLCJUYXNrRGV0YWlscyIsIkVkaXRCdXR0b24iLCJEZWxldGVCdXR0b24iLCJ1c2VSb3V0ZXIiLCJMaXN0VGFyZWZhcyIsInRhc2tzIiwic2V0VGFza3MiLCJlbWFpbCIsInNldEVtYWlsIiwiaXNMb2FkaW5nIiwic2V0SXNMb2FkaW5nIiwibm9SZXN1bHRzIiwic2V0Tm9SZXN1bHRzIiwic2VsZWN0ZWRUYXNrIiwic2V0U2VsZWN0ZWRUYXNrIiwiZWRpdE1vZGUiLCJzZXRFZGl0TW9kZSIsImxpc3RhclRhcmVmYXMiLCJyZXNwb25zZSIsImdldCIsImRhdGEiLCJsZW5ndGgiLCJlcnJvciIsImNvbnNvbGUiLCJoYW5kbGVUYXNrQ2xpY2siLCJ0YXNrIiwicm91dGVyIiwiaGFuZGxlTmV4dEVkaXQiLCJwdXNoIiwiaGFuZGxlTmV4dENhZGFzdHJvIiwiaGFuZGxlRGVsZXRlQnV0dG9uQ2xpY2siLCJ0YXNrSWQiLCJkZWxldGUiLCJwcmV2VGFza3MiLCJmaWx0ZXIiLCJpZCIsImhhbmRsZVVwZGF0ZUZpbmFsaXphZGEiLCJmaW5hbGl6YWRhIiwicGF0Y2giLCJtYXAiLCJoMSIsInR5cGUiLCJwbGFjZWhvbGRlciIsInZhbHVlIiwib25DaGFuZ2UiLCJlIiwidGFyZ2V0IiwidGFyZWZhIiwiaW5kZXgiLCJvbkNsaWNrIiwibmFtZSIsInByaW9yaWRhZGUiLCJoMyIsInAiLCJkZXNjcmljYW8iLCJkaXYiLCJsYWJlbCIsImlucHV0IiwiY2hlY2tlZCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/pages/listagemTarefas/index.jsx\n"));

/***/ })

});