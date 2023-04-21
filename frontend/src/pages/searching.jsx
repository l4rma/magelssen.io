export default function searching() {
  return(
    <>
      <div className="article-text">
      <h1 className="article-header">How to search in a Unix system like
        Linux or macOS</h1>
      <hr />
        <h2 className="article-sub-header" id="find">Find</h2>

        <p>
          The find command can be used to search for files or directories 
          somewhere on the system. Just set where it should search
          recursivly from and what to look for.
        </p>

        <pre><code>
          <span className="code-comment"># find &lt;path&gt; -type f -name &lt;filename&gt;<br />
            # find &lt;path&gt; -type d -name &lt;directory-name&gt;</span><br />
          find / -type f -name passwd
        </code></pre>

        <p>
          To find files you can also pipe find into grep
        </p>

        <pre><code>find ~ | grep notes.txt</code></pre>

        <p>
          Or if you want to check if a file exists in current working directory
          you can pipe ls into grep
        </p>

        <pre><code>ls | grep notes</code></pre>
        <h2 className="article-sub-header" id="grep">Grep</h2>

        <p>
          Grep can be used to search for content in files.<br />
          <blockquote><em>
          The grep utility searches any given input files, selecting lines
          that match one or more patterns. By default, a pattern matches an input
          line if the regular expression (RE) in the pattern matches the input
          line without its trailing newline. An empty expression matches every
          line. Each input line that matches at least one of the patterns is
          written to the standard output. <strong>-man grep</strong></em>
          </blockquote>
        </p>

        <h3 className="article-sub-header" id="how-to-use-grep">How to use Grep</h3>
        <pre><code>grep [OPTION...] &lt;PATTERN&gt; [FILE...]</code></pre>
        <h3 className="article-sub-header" id="options">Some options</h3>
        <table>
          <thead>
            <tr class="header">
              <th>Flag</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr class="odd">
              <td>-r</td>
              <td>Recursive search</td>
            </tr>
            <tr class="even">
              <td>-n</td>
              <td>Line number</td>
            </tr>
            <tr class="odd">
              <td>-i</td>
              <td>Ignore case</td>
            </tr>
            <tr class="even">
              <td>-w</td>
              <td>Match exact word</td>
            </tr>
            <tr class="odd">
              <td>-c</td>
              <td>Count number of occurrences</td>
            </tr>
            <tr class="even">
              <td>-l</td>
              <td>Return filename only</td>
            </tr>
          </tbody>
        </table>

        <h3 className="article-sub-header">Examples using Grep</h3>
        <p>
          Search for pattern in file.
          Returns the lines matching the pattern
        </p>

        <pre><code>
          grep h1 homepage.html<br />

          <span className="code-comment">output:<br />
            &emsp; &lt;h1&gt;Welcome&lt;/h1&gt;
          </span></code></pre>

        <p>
          Search for pattern in files located in current working directory.
          Return the file name of files that include the pattern.
        </p>

        <pre><code>
          grep -rl h1<br /> 

          <span className="code-comment">output:<br />
            ./homepage.html<br />
            ./archive.html<br />
            ./index.html<br />
          </span></code></pre>

        <p>
          From current working directory, search recursively through all files.
          Returns the filename, line number and line that matches the pattern.
        </p>

        <pre><code>
          grep -rn &quot;banana&quot;<br />

          <span className="code-comment">output: <br />
            ./shoppinglist.yaml:34: &emsp; - banana<br />
            ./personal/food_I_like.txt:2: &emsp; Banana: I like bananas.<br />

          </span></code></pre>
      </div>
    </>
  );
}
