export default function tar() {
  return(
    <>
      <div className="article-text">
      <h1 className="article-header">Tar - Extracting .tar.gz files</h1>
      <hr />
        <p>
          <strong>tl;dr:</strong> Tar files are kinda like zip files. Extract
          tar.gz files with 
          <code>tar -xvzf &lt;filename&gt;</code>
          x: extract, z: zipped, v: verbose, f: file.
        </p>

        <h2 className="article-sub-header">What is a .tar file?</h2>

        <p>
          A tar (Tape archive) file is an archive or a bundle of files created
          with the program GNU tar. These files are often called tarballs.
        </p>

        <blockquote>

          <p>
            <em>GNU tar saves many files together into a single tape or disk
            archive, and can restore individual files from the archive. (man tar)</em>
          </p>

        </blockquote>

        <p>
          Tar is often combined with gzip greating a compressed archive with
          the double extension .tar.gz. These can be extracted using many
          different programs like tar on linux and mac or winrar on windows.
        </p>

        <h2 className="article-sub-header" id="how-to-use-tar">How to use tar</h2>
        <h3 id="create-a-tarball">Create an archive</h3>
        <pre>
          <code>
            <span className="code-comment"># tar -cz(v)f &lt;target&gt; &lt;source&gt;</span><br />
            <span className="code-comment"># Create an archive from all the files in current directory and give verbose output</span><br />
            tar -czvf filename.tar.gz *<br />
            <br />
            <span className="code-comment"># tar -czvf &lt;directory&gt;</span><br />
            <span className="code-comment"># Create an archive from the directory &quot;dir&quot; including all files in dir/.</span><br />
            <span className="code-comment"># (When extracted will extract a directory including the included files)</span><br />
            tar -czvf dir.tar.gz dir/
          </code>
        </pre>
        <h3 id="list-all-files-in-a-tarball">List the content of an archive</h3>
        <pre>
          <code>
            <span className="code-comment"># tar -t(v)f &lt;filename&gt;</span><br />
            <span className="code-comment"># List all files included in file.tar.gz</span><br />
            tar -tvf file.tar.gz
          </code>
        </pre>
        <h3 id="extract-a-tarball">Extract content from an archive</h3>
        <pre>
          <code>
            <span className="code-comment"># tar -xz(v)f &lt;filename&gt;</span><br />
            <span className="code-comment"># Extract all files from file.tar.gz to current directory</span><br />
            tar -xzvf file.tar.gz<br />
            <br />
            <span className="code-comment"># tar -xzvf &lt;filename&gt; -C &lt;target directory&gt;</span><br />
            <span className="code-comment"># Extract all files from file.tar.gz to specific directory</span><br />
            tar -xzvf file.tar.gz -C files/
          </code>
        </pre>
        <h2 className="article-sub-header" id="tar-commands">tar commands</h2>
        <table>
          <thead>
            <tr className="header">
              <th>Command</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr className="odd">
              <td>-c</td>
              <td>Create a new archive</td>
            </tr>
            <tr className="even">
              <td>-z</td>
              <td>Compress/decompress with gzip</td>
            </tr>
            <tr className="odd">
              <td>-x</td>
              <td>Extract files from archive</td>
            </tr>
            <tr className="even">
              <td>-f</td>
              <td>Use archive file</td>
            </tr>
            <tr className="odd">
              <td>-C </td>
              <td>Change to directory</td>
            </tr>
            <tr className="even">
              <td>-t</td>
              <td>List archive content</td>
            </tr>
            <tr className="odd">
              <td>-v</td>
              <td>Verbose output</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
