function paddingLineBetweenStatements(behaviour) {
  const $ = {
    block: 'block',
    blockLike: 'block-like',
    break: 'break',
    case: 'case',
    cjsExport: 'cjs-export',
    cjsImport: 'cjs-import',
    class: 'class',
    const: 'const',
    continue: 'continue',
    debugger: 'debugger',
    default: 'default',
    directive: 'directive',
    do: 'do',
    empty: 'empty',
    export: 'export',
    expression: 'expression',
    for: 'for',
    function: 'function',
    if: 'if',
    iife: 'iife',
    import: 'import',
    let: 'let',
    multilineBlockLike: 'multiline-block-like',
    multilineConst: 'multiline-const',
    multilineExpression: 'multiline-expression',
    multilineLet: 'multiline-let',
    multilineVar: 'multiline-var',
    return: 'return',
    singlelineConst: 'singleline-const',
    singlelineLet: 'singleline-let',
    singlelineVar: 'singleline-var',
    switch: 'switch',
    throw: 'throw',
    try: 'try',
    var: 'var',
    while: 'while',
    with: 'with',
  };

  function omit(...values) {
    return Object.values($).filter((type) => values.indexOf(type) === -1);
  }

  function rule(prev, next) {
    return { blankLine: 'always', prev, next };
  }

  function before(...statementTypes) {
    return rule('*', statementTypes);
  }

  function after(...statementTypes) {
    return rule(statementTypes, '*');
  }

  function beforeGroup(...statementTypes) {
    return rule(omit(...statementTypes), statementTypes);
  }

  function afterGroup(...statementTypes) {
    return rule(statementTypes, omit(...statementTypes));
  }

  return [
    behaviour,
    before($.blockLike, $.case, $.default, $.return),
    after($.blockLike),
    beforeGroup($.export),
    beforeGroup(
      $.var,
      $.let,
      $.const,
      $.singlelineVar,
      $.singlelineLet,
      $.singlelineConst,
    ),
    afterGroup($.import),
    afterGroup($.cjsImport),
  ];
}

module.exports = paddingLineBetweenStatements;
