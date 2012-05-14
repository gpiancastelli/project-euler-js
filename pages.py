import glob
import json
import os
import re
import shutil
import sys

HEADER_TEMPLATE = '''
<!DOCTYPE html>
<meta charset=utf-8>
<title>Project Euler - Solutions in JavaScript</title>
<link rel=stylesheet href=s/pe.min.css>
<link rel=stylesheet href=s/desert.min.css>
<h1>Project Euler</h1>
<h2>Solutions in JavaScript</h2>
<div id=main>
<div id=pe>
<h3><div id=p>Problem <div id=pn>{0}</div></div><div id=pt>{1}</div></h3>
<p id=pd>{2}
<h3 id=s>Solution</h3>
'''.lstrip()

CODE_TEMPLATE = '''
<pre id=sc class=prettyprint>
<code class=language-javascript>
{0}
</code>
</pre>
'''

FOOTER_TEMPLATE = '''
</div>
</div>
'''

RUNNER_TEMPLATE = '''
<div>
<input id=r type=button value=Run></td>
<table id=tr>
<tr>
<td id=text></td>
<td id=solution></td>
<td id=time></td>
<td id=icon></td>
</tr>
</table>
</div>
'''

PREV_NAV_TEMPLATE = '''
<a href={0}.html rel=prev title="back to Problem {0}"><img src=i/p.png alt=&lt;></a>
'''.strip()

PROBLEM_NAV_TEMPLATE = '''
<a href={0}.html title="go to Problem {0}"><span>{0}</span></a>
'''.strip()

SELECTED_NAV_TEMPLATE = '''
<span class=s>{0}</span>
'''.strip()

NEXT_NAV_TEMPLATE = '''
<a href={0}.html rel=next title="onward to Problem {0}"><img src=i/n.png alt=&gt;></a>
'''.strip()

SCRIPT_TEMPLATE = '''
<p class=c>&copy; 2012 <a href=http://github.com/gpiancastelli>Giulio Piancastelli</a><br>
Suggestions? Issues? Comments? <a href=https://github.com/gpiancastelli/project-euler-js/issues>I&rsquo;d love to hear you!</a>
<script src=j/jquery.min.js></script>
<script src=j/prettify.min.js></script>
'''

DEST_DIR = sys.argv[1] if len(sys.argv) > 0 else '.'

def navigation(p, np):
    navigation = []
    if p - 1:
        navigation.append(PREV_NAV_TEMPLATE.format(p - 1))
    for i in range(1, np + 1):
        if i == p:
            navigation.append(SELECTED_NAV_TEMPLATE.format(i))
        else:
            navigation.append(PROBLEM_NAV_TEMPLATE.format(i))
    if p < np:
        navigation.append(NEXT_NAV_TEMPLATE.format(p + 1))
    return '<p class=v>' + ' '.join(navigation)

SOLUTION_TEMPLATE = r'''
var problem = {{
    solution: \1,
    args: [\2],
    result: {0}
}};'''.lstrip()

def solution(n, js, result):
    filename = os.path.join('j', str(n) + '.js')
    with open(os.path.join(DEST_DIR, filename), 'w') as f:
        pattern = r'console\.log\((.*)\((.*)\)\);'
        replacement = SOLUTION_TEMPLATE.format(result)
        f.write(re.sub(pattern, replacement, js))
    # return the new JavaScript file name for the solution
    return os.path.basename(filename)

with open('problems.json') as p:
    problems = json.load(p)

solutions = glob.glob('*.js')

for filename in solutions:
    n = int(os.path.splitext(filename)[0]) # cut leading zeros
    pagename = os.path.join(DEST_DIR, str(n) + '.html')
    problem = problems[n - 1]

    with open(filename) as input, open(pagename, 'w') as output:
        output.write(HEADER_TEMPLATE.format(n, problem['title'], problem['desc']))
        js = input.read()
        output.write(CODE_TEMPLATE.format(js))
        output.write(FOOTER_TEMPLATE)
        output.write(RUNNER_TEMPLATE)
        output.write(navigation(n, len(solutions)))
        output.write(SCRIPT_TEMPLATE)
        output.write('<script src=j/' + solution(n, js, problem['result']) + '></script>')

# first problem page is also home page
shutil.copy(os.path.join(DEST_DIR, '1.html'),
            os.path.join(DEST_DIR, 'index.html'))
