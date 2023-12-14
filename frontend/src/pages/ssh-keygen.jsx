export default function sshKeygen() {
	return(
		<>
			<div className="article-text">
				<h1 className="article-header">Generating SSH-key</h1>
				<hr />
				<p>
					<strong>tl;dr:</strong> Create SSH key pair at ~/.ssh/
					<code>ssh-keygen</code>
					enter, enter, enter...
				</p>

				<h2 className="article-sub-header">How to use ssh-keygen</h2>

				<p>
					To generate a ssh key pair you can simply type ssh-keygen in the
					terminal, hit enter a couple of times, and then you will have a
					private key and a public key stored in ~/.ssh. How ever you might 
					want to specify the keys in some ways.
				</p>

				<pre>
					<code>
						<span className="code-comment"># Create a ssh-key with specified type, path and comment</span><br />
						<span className="code-comment"># ssh-keygen -t &lt;type&gt; -f &lt;filename&gt; -C &lt;comment&gt;</span><br />
						ssh-keygen -f ~/.ssh/project123_key -t ed25519 -C project-123<br /><br />
						<span className="code-comment"># Copy the pub key to clipboard and paste it in where needed (macOs)</span><br />
						cat ~/.ssh/project-123_key.pub | pbcopy<br />
						<span className="code-comment"># For linux you can use xclip</span><br />
						cat ~/.ssh/project-123_key.pub | xclip 
					</code>
				</pre>

				<h2 className="article-sub-header">Key format</h2>

				<p>
					On macOS the default key format is "OPENSSH PRIVATE KEY". To instead 
					create a "RSA PRIVATE KEY", you can use the flag -m
				</p>

				<blockquote>
					<p>
						<em>Specify a key format for key generation, the -i (import), -e (export) conversion options, and the -p change
							passphrase operation.  The latter may be used to convert between OpenSSH private key and PEM private key
							formats.  The supported key formats are: “RFC4716” (RFC 4716/SSH2 public or private key), “PKCS8” (PKCS8
							public or private key) or “PEM” (PEM public key).  By default OpenSSH will write newly-generated private
							keys in its own format, but when converting public keys for export the default format is “RFC4716”.  Setting
							a format of “PEM” when generating or updating a supported private key type will cause the key to be stored
							in the legacy PEM private key format. (man ssh-keygen)</em>
					</p>
				</blockquote>

				<pre>
					<code>
						<span className="code-comment"># Create a ssh-key with the RSA format</span><br />
						ssh-keygen -m PEM -t rsa -C personal@comment.com
					</code>
				</pre>

				<p>
					The email or comment at the end is just used to distinguish your key
					from others if you have multiple keys. It can be what ever.
				</p>

				<h2 className="article-sub-header" id="key-byte-size">Key bit size</h2>
				<p>
					The bit size can be set with the flag -b<br />
					For ed25519 the length is fixed and -b will be ignored.
				</p>

				<pre>
					<code>
						<span className="code-comment"># ssh-keygen -b &lt;size&gt;</span><br />
						<span className="code-comment"># Specify bit size of key </span><br />
						ssh-keygen -b 4096<br />
						<br />
						<span className="code-comment"># ssh-keygen -l -f &lt;filename&gt;</span><br />
						<span className="code-comment"># Check fingerprint of key file. Also shows bit size.</span><br />
						ssh-keygen -l -f ~/.ssh/id_rsa.pub
					</code>
				</pre>
			</div>
		</>
	);
}
