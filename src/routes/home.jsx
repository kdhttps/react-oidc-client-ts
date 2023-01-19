import { makeUserAuthentication } from "../makeOIDCUserManager";
import TreeView from "react-accessible-treeview";
import { DiCss3, DiJavascript, DiNpm } from "react-icons/di";
import { FaList, FaRegFolder, FaRegFolderOpen } from "react-icons/fa";
import { getFlatTree } from "../test";

const data = [
  { name: "", children: [1, 4, 9, 10, 11], id: 0, parent: null },
  { name: "src", children: [2, 3], id: 1, parent: 0 },
  { name: "index.js", id: 2, parent: 1 },
  { name: "styles.css", id: 3, parent: 1 },
  { name: "node_modules", children: [5, 7], id: 4, parent: 0 },
  { name: "react-accessible-treeview", children: [6], id: 5, parent: 4 },
  { name: "bundle.js", id: 6, parent: 5 },
  { name: "react", children: [8], id: 7, parent: 4 },
  { name: "bundle.js", id: 8, parent: 7 },
  { name: ".npmignore", id: 9, parent: 0 },
  { name: "package.json", id: 10, parent: 0 },
  { name: "webpack.config.js", id: 11, parent: 0 },
];

export default function Home() {
  const auth = makeUserAuthentication()
  
  async function login() {
    return await auth.signinRedirect()
  }
 
  const githubTreeJson = getFlatTree()

  return (
    <div id="home-page">
      <h2>Hello, Login with Jans Github Flow</h2>
      <button onClick={login}>Login</button>
      <br />
      <hr />
      <div className="directory">
        <TreeView
          data={githubTreeJson}
          aria-label="directory tree"
          nodeRenderer={({
            element,
            isBranch,
            isExpanded,
            getNodeProps,
            level,
          }) => (
            <div {...getNodeProps()} style={{ paddingLeft: 20 * (level - 1) }}>
              {isBranch ? (
                <FolderIcon isOpen={isExpanded} />
              ) : (
                <FileIcon filename={element.name} />
              )}

              {element.name}
            </div>
          )}
        />
      </div>
    </div>
  );
}

const FolderIcon = ({ isOpen }) =>
  isOpen ? (
    <FaRegFolderOpen color="e8a87c" className="icon" />
  ) : (
    <FaRegFolder color="e8a87c" className="icon" />
  );

const FileIcon = ({ filename }) => {
  const extension = filename.slice(filename.lastIndexOf(".") + 1);
  switch (extension) {
    case "js":
      return <DiJavascript color="yellow" className="icon" />;
    case "css":
      return <DiCss3 color="turquoise" className="icon" />;
    case "json":
      return <FaList color="yellow" className="icon" />;
    case "npmignore":
      return <DiNpm color="red" className="icon" />;
    default:
      return null;
  }
};