/* export default function User({ user }) {
  return (
    <div className="user-card">
      <img src={user.image} alt={user.name} />
      <h2>{user.name}</h2>
      <p>{user.mail} </p>
    </div>
  );
}
 */

export default function User({ user }) {
  return (
    <article className="user-card">
      <img
        src={
          user.image || "https://placehold.co/600x400?text=Error+loading+image"
        }
        alt={user.name}
      />
      <h2>{user.name}</h2>
      <p className="title">{user.title}</p>
      <p>
        <a href={`mailto:${user.mail}`}>{user.mail}</a>
      </p>
    </article>
  );
}
